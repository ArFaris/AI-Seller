import * as React from 'react';
import type { IconProps } from '../Icon';
import Icon from '../Icon';

const DotIcon: React.FC<IconProps> = ({
    width = 6,
    height = 6,
    color = 'accent',
    ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} color={color} {...props}>
      <g clip-path="url(#clip0_5073_539)">
      <rect width="6.0025" height="6.0015" rx="3.00075" fill="#FAAD14"/>
      </g>
      <defs>
      <clipPath id="clip0_5073_539">
      <rect width="6.0025" height="6.0015" rx="3.00075" fill="white"/>
      </clipPath>
      </defs>
    </Icon>
  );
};

export default DotIcon;
