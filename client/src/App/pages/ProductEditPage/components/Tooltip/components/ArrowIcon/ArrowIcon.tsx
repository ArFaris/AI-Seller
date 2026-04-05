import * as React from 'react';
import type { IconProps } from 'components/icons/Icon';
import Icon from 'components/icons/Icon';

const ArrowIcon: React.FC<IconProps> = ({
    width = 12,
    height = 6,
    color = 'black',
    ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} color={color} {...props} viewBox={`0 0 12 6`}>
        <g clip-path="url(#clip0_24_5126)">
        <path d="M5.65686 -5.65869L11.3137 -0.00183725L7.07107 4.2408C6.29003 5.02185 5.0237 5.02185 4.24265 4.2408L6.19888e-06 -0.00183725L5.65686 -5.65869Z" fill="currentColor"/>
        </g>
        <defs>
        <clipPath id="clip0_24_5126">
        <rect width="11.3137" height="5.655" fill="currentColor"/>
        </clipPath>
        </defs>
    </Icon>
  );
};

export default ArrowIcon;
