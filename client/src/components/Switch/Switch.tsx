import s from './Switch.module.scss';
import Text from 'components/Text';

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
};

const Switch: React.FC<SwitchProps> = ({ 
  checked, 
  onChange, 
  disabled = false,
  label 
}) => {
  return (
    <label className={`${s.switch} ${disabled ? s.disabled : ''}`}>
      {label && <Text view='p-14' className={s.label}>{label}</Text>}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={s.slider} />
    </label>
  );
};

export default Switch;
