import Text from 'components/Text';
import s from './EditField.module.scss';
import RequiredIcon from '../icons/RequiredIcon';

type EditFieldProps = {
    title: string;
    field: React.ReactNode;
    view?: 'p-14' | 'p-16';
    className?: string;
    isAfterLine?: boolean;
    isRequired?: boolean;
    errorMessage?: string;
}

const EditField: React.FC<EditFieldProps> = ({
    title, 
    field, 
    view = 'p-16', 
    className, 
    isAfterLine = true, 
    isRequired = false,
    errorMessage,
}: EditFieldProps) => {
    return (
        <>
            <div className={s.field}>
                <div className={s.title}>
                    {isRequired && <RequiredIcon/>}
                    <Text view={view} className={className}>{title}</Text>
                </div>
                {field}
                {errorMessage && <Text className={s.error__message}>{errorMessage}</Text>}
            </div>
            {isAfterLine && <div className={s.line}></div>}
        </>
    );
}

export default EditField;
