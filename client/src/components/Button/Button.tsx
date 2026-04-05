import React from 'react';
import Loader from '../Loader';
import Text from 'components/Text';
import s from './Button.module.scss';
import cn from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;

  white?: boolean;

  slot?: React.ReactNode;
  
  isAfterSlot?: boolean;

  view?: 'primary' | 'secondary' | 'accent' | 'white' | 'filter' | 'pagination' | 'error';
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  white = false,
  children,
  className = '',
  disabled = false,
  slot,
  isAfterSlot = true,
  view = 'primary',
  ...props
}) => {
  return (
    <button
      className={cn(s.button, disabled && s.button_disabled, s[`button_view-${view}`], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader size="s" className={s.button__loader} />}
      {!isAfterSlot && slot}
      <Text className={cn(white ? s['button__text-white'] : s.button__text)} tag="span" view="button">
        {children}
      </Text>
      {isAfterSlot && slot}
    </button>
  );
};

export default Button;
