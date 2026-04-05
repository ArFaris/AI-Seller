import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Text from 'components/Text';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import EditField from './components/EditField';
import s from './ProductEditPage.module.scss';
import cn from 'classnames';
import { useItem } from 'hooks/useItem';
import LoadingScreen from 'components/LoadingScreen';
import categoryHelper from 'utils/categoryHelper';
import { useEffect, useState } from 'react';
import { CATEGORY_OPTIONS } from 'consts/categories';
import DeleteIcon from './components/icons/DeleteIcon';
import Button from 'components/Button';
import { FormSchema } from 'shared/schemas/form.schema';
import { useForm } from 'hooks/useForm';
import { useUpdateItem } from 'hooks/useUpdateItem';
import type { ProductFormData } from 'types/formData';
import { useGenerateDescription, useSuggestPrice } from 'hooks/useLLM';
import AIModal from './components/AIModal';
import Notification from './components/Notification';

const ProductEditPage = () => {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const [recommendedPrice, setRecommendedPrice] = useState<{price: number, analysis: string} | null>(null);
    const [recommendedDescription, setRecommendedDescription] = useState<string | null>(null);
    const [symbolsCount, setSymbolsCount] = useState<number>(0);
    const [hasLocalData, setHasLocalData] = useState(false);
    const [showSuccessNotif, setShowSuccessNotif] = useState(false);
    const [showErrorNotif, setShowErrorNotif] = useState(false);

    const { form, setForm, errors, handleChange, handleNestedChange, handleSubmit } = useForm({
        initialData: {
            title: '',
            price: 0,
            category: 'auto',
            params: {},
            description: ''
        },
        schema: FormSchema,
        onSubmit: async (data) => {
            if (!id) return;
            
            await update(data);
        }
    });

    const isFormInvalid = !form.title || (form.price !== 0 && !form.price) || !form.category;

    useEffect(() => {
        const data = localStorage.getItem(`form-${id}`);

        if (data) {
            setForm(JSON.parse(data));
            setHasLocalData(true);
        }
    }, [id]);

    useEffect(() => {
        localStorage.setItem(`form-${id}`, JSON.stringify(form));
    }, [form])

    const { data, isLoading } = useItem(id!, { enabled: !hasLocalData });

    useEffect(() => {
        if (data && !hasLocalData) {
            const newForm = {
                title: data.title,
                price: data.price,
                category: data.category,
                params: data.params,
                description: data.description
            };

            setForm(newForm);
            setSymbolsCount(data.description?.length || 0);
        }
    }, [data, hasLocalData]);

    const { mutateAsync: updateItem } = useUpdateItem();
    const { mutateAsync: generateDescription, isPending: isDescriptionPending, isError: isDescriptionError } = useGenerateDescription();
    const { mutateAsync: generatePrice, isPending: isPricePending, isError: isPriceError } = useSuggestPrice();

    console.log(isDescriptionError)
    
    const update = async (data: ProductFormData) => {
        console.log(id, data)
        if (!id) return;

        try {
            await updateItem({ id, data });
            setShowSuccessNotif(true);
            setTimeout(() => {
                setShowSuccessNotif(false);
                navigate(`/ads/${id}`);
            }, 1000);
        } catch (error) {
            setShowErrorNotif(true);
            setTimeout(() => setShowErrorNotif(false), 3000);
        }
    };
  
    const handleDescriptionGenerate = async () => {
        try {
            const description = await generateDescription(form);
            const pureDescription = description.replace(/^["']|["']$/g, '');
            setRecommendedDescription(pureDescription);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePriceGenerate = async () => {
        try {
            const { price, analysis } = await generatePrice(form);
            setRecommendedPrice({price, analysis});
        } catch (error) {
            console.error(error);
        }
    };

    const handleTextAreaChange = (value: string | null) => {
        if (!value) {
            handleChange('description', null);
            return;
        }

        if (symbolsCount === 1000 && value.length >= 1000) return;

        let sliceValue: string = value.length > 1000 ? value.slice(0, 1000) : value;

        setSymbolsCount(sliceValue.length); 
        handleChange('description', sliceValue);
    }

    if (isLoading) return <LoadingScreen />;
    if (!data) return <div>Объявление не найдено</div>;

    const fields = categoryHelper.formatParams(form.category, form.params);
    return (
        <main className={s.page}>
            {showSuccessNotif && <Notification type='success' />}
            {showErrorNotif && <Notification type='error' />}
            <Text view='title'>Редактирование объявления</Text>

            <EditField className={s.title} 
                       title='Категория' 
                       field={<Dropdown className={s.dropdown} 
                                        options={CATEGORY_OPTIONS} 
                                        value={CATEGORY_OPTIONS.find(o => o.key === form.category) || null} 
                                        onChange={(option) => handleChange('category', option?.key)} 
                                        getTitle={(option) => {return option?.value || 'Выберите категорию'}}
            />} />
            <EditField isRequired={true} 
                       errorMessage={(!form.title && 'Название должно быть заполнено') || errors['title']}
                       className={s.title} 
                       title='Название' 
                       field={<Input data-full={!!form.title} 
                                     data-error={!!errors['title'] || !form.title}
                                     afterSlot={form.title && <DeleteIcon onClick={() => handleChange('title', '')}/>} 
                                     afterPosition={{ top: '9px', right: '12px' }} 
                                     value={form.title} 
                                     onChange={(val) => handleChange('title', val)}
                                />} 
            />

            <div className={s.price}>
                <EditField isRequired={true} 
                           errorMessage={(form.price !== 0 && !form.price && 'Введите цену') || errors['price']}
                           className={s.title} 
                           title='Цена' 
                           field={<Input data-full={!!form.price.toString()} 
                                         data-error={!!errors['price'] || (form.price !== 0 && !form.price)}
                                         afterSlot={form.price.toString() && <DeleteIcon onClick={() => handleChange('price', '')}/>} 
                                         afterPosition={{ top: '9px', right: '12px' }} 
                                         value={form.price.toString()} 
                                         onChange={(val) => handleChange('price', Number(val))}
                                    />} 
                />
                    <AIModal handleGenerate={handlePriceGenerate}
                             isPending={isPricePending} 
                             isError={isPriceError}
                             recommended={recommendedPrice} 
                             buttonText={'Узнать рыночную цену'} 
                             applyChanges={() => handleChange('price', recommendedPrice?.price)} 
                             setRecommended={setRecommendedPrice}/>
            </div>

            <Text className={cn(s.title, s.title__specific)}>Характеристики</Text>
            <div className={s.specific}>
                {
                    fields.map(field =>
                        <EditField key={field.key}
                                   title={field.label} 
                                   errorMessage={errors[`params.${field.key}`]}
                                   view='p-14'
                                   isAfterLine={false}
                                   field={
                                        field.type === 'dropdown' ? (
                                            <Dropdown value={field.options?.find(o => o.value === field.value) || null}
                                                    options={field.options || []}
                                                    onChange={(option) => 
                                                        handleNestedChange(field.key, option?.key)
                                                    }
                                                    getTitle={(o) => o?.value || `Выберите характеристику`}
                                                    className={s.dropdown} />
                                        ) : (
                                            <Input 
                                                placeholder={'Введите характеристику'}
                                                data-error={!!errors[`params.${field.key}`]}
                                                afterSlot={field.value && <DeleteIcon onClick={() => handleNestedChange(field.key, '')}/>} 
                                                afterPosition={{ top: '9px', right: '12px' }}
                                                value={field.value || ''}
                                                data-full={!!field.value}
                                                onChange={(val) =>
                                                    handleNestedChange(field.key, val)
                                                }
                                            />
                                        )
                                    }
                        />
                    )
                }
            </div>

            <div className={s.line}></div>
            <EditField className={s.title} 
                       title='Описание' 
                       isAfterLine={false}
                       field={
                            <div className={s.description__parent}>
                                <div className={s.desctiption__parent}>
                                    <textarea onChange={(e) => handleTextAreaChange(e.target.value)} className={s.description} value={form.description}></textarea>
                                    <Text className={s.description__counter} view='p-14' color='secondary'>{`${symbolsCount} / 1000`}</Text>
                                </div>
                                <AIModal handleGenerate={handleDescriptionGenerate}
                                        isPending={isDescriptionPending} 
                                        isError={isDescriptionError}
                                        recommended={recommendedDescription} 
                                        buttonText={`${form.description ? 'Улучшить' : 'Придумать'} описание`} 
                                        applyChanges={() => handleTextAreaChange(recommendedDescription)} 
                                        setRecommended={setRecommendedDescription}
                                        className={s.child}/>
                            </div>
            }/>

            <div className={s.button__group}>
                <Button onClick={() => handleSubmit()} disabled={isFormInvalid}>Сохранить</Button>
                <Button view='secondary' onClick={() => navigate(`/ads/${id}`)}>Отменить</Button>
            </div>
        </main>
    );
}

export default ProductEditPage;
