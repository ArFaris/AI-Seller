import React, { useState } from 'react';
import cn from 'classnames';
import s from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange?: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;

  error?: boolean;

  editmode?: boolean;

  gray?: boolean;

  multiGray?: boolean;

  afterPosition?: {top: string, right: string};
};

const Input: React.FC<InputProps> = ({
  value, 
  onChange, 
  afterSlot, 
  afterPosition = { top: '14px', right: '12px' },
  className,
  error,
  placeholder,
  editmode,
  gray,
  multiGray,
  ...props}) =>
{
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (currentValue: string) => {
      setSearchText(currentValue);
  }

  if (!onChange) onChange = handleInputChange;
  if (!value) value = searchText;

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <div className={cn(s.input, className, gray && s.gray, multiGray && s.gray__multi, error && s.error, editmode && s.editmode)}
        style={
            { '--top': afterPosition.top,
              '--right': afterPosition.right
            } as React.CSSProperties
        }
    >
      <input type="text" value={value} {...props} placeholder={placeholder || 'Текст'} onChange={handleChange}/>
      <div className={s.input__after}>
        {afterSlot}
      </div>
    </div>
  );
};

export default Input;
