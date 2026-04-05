import Text from 'components/Text';
import s from './Tooltip.module.scss';
import cn from 'classnames';
import ArrowIcon from './components/ArrowIcon';

type TooltipProps = {
    title: string;
    description: string;
    afterSlot: React.ReactNode;
    isError: boolean;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    title,
    description,
    afterSlot,
    isError,
    className
}: TooltipProps) => {
    return (
        <article className={s.tooltip__wrapper}>
            <div className={cn(s.tooltip, isError && s['tooltip-error'], className)}>
                <Text className={s.title__modal} color={isError ? 'error' : 'primary'} weight='medium'>{title}</Text>
                <Text className={cn(s.modal__text, s['s.modal__text-error'])}>
                    {description}
                </Text>
                {afterSlot}
                {<ArrowIcon className={s.tooltip__icon} color={isError ? 'error' : 'white'}/>}
            </div>
        </article>
    );
}

export default Tooltip;
