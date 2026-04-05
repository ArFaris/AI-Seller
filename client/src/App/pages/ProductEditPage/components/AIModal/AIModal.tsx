import s from './AIModal.module.scss';
import cn from 'classnames';
import Button from 'components/Button';
import LampIcon from '../icons/LampIcon';
import RepeatIcon from '../icons/RepeatIcon';
import Tooltip from '../Tooltip';

type AIModalProps = {
    handleGenerate: () => void;
    isPending: boolean;
    isError: boolean;
    recommended: string | null | {price: number, analysis: string};
    setRecommended: (value: any) => void;
    buttonText: string;
    applyChanges: () => void;
    className?: string;
}

const AIModal = ({handleGenerate, isPending, isError = true, recommended, buttonText, applyChanges, setRecommended, className }: AIModalProps) => {
    const handleBtnApply = () => { 
        applyChanges();
        setRecommended(null);
    }

    return (
        <>
            <Button 
                onClick={handleGenerate} 
                className={s.button} 
                loading={isPending}
                slot={!isPending && (recommended ? <RepeatIcon /> : <LampIcon />)} 
                isAfterSlot={false}
                view='accent'>{isPending ? 'Выполняется запрос' : !recommended ? buttonText : 'Повторить запрос'}
            </Button>
                {(recommended || isError) && 
                    <Tooltip title={isError ? 'Произошла ошибка при запросе к AI' : 'Ответ AI:'}
                             description={isError ? 'Попробуйте повторить запрос или закройте уведомление'
                                : typeof recommended === 'string' ? recommended : recommended !== null ? recommended.analysis : ''}
                             afterSlot={
                                isError ? <Button view='error' className={s.button__modal} onClick={() => setRecommended(null)}>Закрыть</Button> :
                                <div className={cn(s.button__group, s['button__group-modal'])}>
                                    <Button className={s.button__modal} onClick={handleBtnApply}>Применить</Button>
                                    <Button view='pagination' className={s.button__modal} onClick={() => setRecommended(null)}>Закрыть</Button>
                                </div>
                             }
                             isError={isError}
                             className={className}
                    />
                }
        </>
    );
}

export default AIModal;
