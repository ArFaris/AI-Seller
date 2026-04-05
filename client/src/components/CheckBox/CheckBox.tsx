import React from 'react';
import cn from 'classnames';
import s from './CheckBox.module.scss';
import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (checked: boolean) => void;
};

const CheckBox = ({onChange, ...props}: CheckBoxProps) => {
  return (
    <label className={cn(props.className, s.checkbox)}>
      <input type="checkbox" onChange={(e) => onChange(e.target.checked)} {...props}/>
      <span className={cn(s.checkbox__box, !props.checked && s['checkbox__box-border'])}>
        {props.checked && <CheckIcon viewBox="0 0 16 16" width='16' height='16' color={props.disabled ? "black" : 'white'}/>}
      </span>
    </label>
  );
};

export default CheckBox;
