import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Text from 'components/Text';
import s from './ProductPage.module.scss';
import Button from 'components/Button';
import EditIcon from 'components/icons/EditIcon';
import ExclamationIcon from 'components/icons/ExclamationIcon';
import cn from 'classnames';
import { useItem } from 'hooks/useItem';
import LoadingScreen from 'components/LoadingScreen';
import formatDate from 'utils/formatDate';
import categoryHelper from 'utils/categoryHelper';

const ProductPage = () => {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();

    const { data, isLoading } = useItem(id!);

    if (isLoading) return <LoadingScreen /> 
    if (!data) return <div>Объявление не найдено</div>;

    const fields = categoryHelper.formatParams(data.category, data.params);
    const unfilledParams = categoryHelper.getUnfilledParams(data.category, data.params);

    return (
        <div className={s.page}>
            <header className={s.header}>
                <div className={s.header__titles}>
                    <Text view='title'>{data.title}</Text>
                    <Text view='title'>{`${data.price.toString()} ₽`}</Text>
                </div>

                <div>
                    <Button slot={<EditIcon color='white'/>} onClick={() => navigate(`/ads/${id}/edit`)}>Редактировать</Button>

                    <div>
                        <Text view='p-16' className={s.text}>{`Опубликовано: ${formatDate(data.createdAt)}`}</Text>
                        <Text view='p-16' className={s.text}>{`Отредактировано: ${formatDate(data.updatedAt)}`}</Text>
                    </div>
                </div>
            </header>

            <div className={cn(s.line, s.line__product)}></div>

            <main>
                <div className={s.content}>
                    <img className={s.image} src={'/cover.png'}/>

                    <div>
                        {
                            (unfilledParams.length !== 0) && 
                                <div className={s.unfinished}>
                                    <ExclamationIcon />
                                    <div>
                                        <Text view='p-16' weight='bold' className={s.unfinished__title}>Требуются доработки</Text>
                                        <Text view='p-14'>У объявления не заполнены поля:</Text>
                                        {
                                            unfilledParams.map(param => 
                                                <Text view='p-14' className={s.unfinished__point}>{`• ${param}`}</Text>
                                            )
                                        }
                                    </div>
                                </div>
                        }

                        <Text view='subtitle'>Характеристики</Text>

                        <div className={s.charac__container}>
                            {
                                fields.map(field => {
                                    if (field.isEmpty) return;
                                    console.log('поле', field)
                                    return (<span className={s.charac} key={field.key}>
                                        <Text view='p-16' color='secondary' weight='bold' className={s.charac__key}>{field.label}</Text>
                                        <Text view='p-16'>{field.value}</Text>
                                    </span>);
                                }
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className={s.description}>
                    <Text view='subtitle'>Описание</Text>
                    <Text view='p-16'>{data.description || 'Отсутствует'}</Text>
                </div>
            </main>

            <Button view='pagination' className={s.exit} onClick={() => navigate('/ads')}>Вернуться на главную</Button>
        </div>
    );
}

export default ProductPage;
