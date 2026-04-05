import Text from 'components/Text';
import s from './Notification.module.scss';
import SuccessIcon from './components/SuccessIcon';
import ErrorIcon from './components/ErrorIcon';
import cn from 'classnames';

type NotificationProps = {
    type: 'error' | 'success';
}

const Notification: React.FC<NotificationProps> = ({
    type
}: NotificationProps) => {
    return (
        <article className={cn(s.notification, s[`notification-${type}`])}>
            <div className={s.notification__title}>
                {type === 'error' ? <ErrorIcon /> : <SuccessIcon />}
                <Text view='p-14'>{type === 'error' ? 'Ошибка сохранения' : 'Изменения сохранены'}</Text>
            </div>
            {type === 'error' && <Text view='p-14' className={s.notification__description}>При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.</Text>}
        </article>
    );
}

export default Notification;
