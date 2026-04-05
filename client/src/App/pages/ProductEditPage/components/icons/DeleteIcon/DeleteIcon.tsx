import * as React from 'react';
import type { IconProps } from 'components/icons/Icon';
import Icon from 'components/icons/Icon';

const LampIcon: React.FC<IconProps> = ({
    width = 14,
    height = 14,
    color = 'black',
    ...props
}: IconProps) => {
  return (
    <Icon width={width} height={height} color={color} {...props}>
      <g clip-path="url(#clip0_24_4616)">
      <path d="M7.00172 0.87793C3.6193 0.87793 0.876724 3.62051 0.876724 7.00293C0.876724 10.3854 3.6193 13.1279 7.00172 13.1279C10.3841 13.1279 13.1267 10.3854 13.1267 7.00293C13.1267 3.62051 10.3841 0.87793 7.00172 0.87793ZM9.26305 9.32988L8.36071 9.32578L7.00172 7.70566L5.64411 9.32441L4.7404 9.32852C4.68024 9.32852 4.63102 9.28066 4.63102 9.21914C4.63102 9.19316 4.64059 9.16856 4.657 9.14805L6.43571 7.02891L4.657 4.91113C4.64048 4.8911 4.63131 4.86601 4.63102 4.84004C4.63102 4.77988 4.68024 4.73066 4.7404 4.73066L5.64411 4.73477L7.00172 6.35488L8.35934 4.73613L9.26169 4.73203C9.32184 4.73203 9.37106 4.77988 9.37106 4.84141C9.37106 4.86738 9.36149 4.89199 9.34508 4.9125L7.56911 7.03027L9.34645 9.14941C9.36286 9.16992 9.37243 9.19453 9.37243 9.22051C9.37243 9.28066 9.32321 9.32988 9.26305 9.32988Z" fill="currentColor" fill-opacity="0.25"/>
      </g>
      <defs>
      <clipPath id="clip0_24_4616">
      <rect width="14" height="14" fill="white"/>
      </clipPath>
      </defs>
    </Icon>
  );
};

export default LampIcon;
