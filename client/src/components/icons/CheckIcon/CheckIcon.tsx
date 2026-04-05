import * as React from 'react';
import { type IconProps } from '../Icon';
import Icon from '../Icon';

const CheckIcon: React.FC<IconProps> = ({
    width = 16,
    height = 16,
    ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} {...props}>
      <rect width="16" height="16" rx="2" fill="white"/>
      <rect width="16" height="16" rx="2" fill="#1890FF"/>
      <path d="M7.10533 12.6041L7.08771 12.6217L2.68787 8.22185L4.12054 6.78917L7.10539 9.77402L11.8794 5L13.3121 6.43268L7.12301 12.6218L7.10533 12.6041Z" fill="white"/>
    </Icon>
  );
};

export default CheckIcon;
