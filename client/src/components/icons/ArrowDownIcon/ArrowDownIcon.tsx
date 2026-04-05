import * as React from 'react';
import type { IconProps } from '../Icon';
import Icon from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = ({
    width = 10,
    height = 10,
    color = 'black',
    ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} color={color} {...props} viewBox={`0 0 10 10`}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.68582 3.14258C1.74269 3.14263 1.79592 3.17108 1.82938 3.2168L5.00028 7.58691L8.17117 3.2168C8.20458 3.17115 8.25796 3.14271 8.31473 3.14258H9.15262C9.22491 3.1429 9.26735 3.22612 9.22391 3.28516L5.28836 8.70996C5.14661 8.90636 4.85406 8.90638 4.71121 8.70996L0.775666 3.28516C0.733255 3.226 0.776363 3.14258 0.848908 3.14258H1.68582Z" fill="currentColor" fill-opacity="0.85"/>
    </Icon>
  );
};

export default ArrowDownIcon;
