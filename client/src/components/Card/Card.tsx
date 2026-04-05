import React from 'react';
import Text from '../Text';
import s from './Card.module.scss';
import cn from 'classnames';
import DotIcon from 'components/icons/DotIcon';

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Содержимое карточки (прайс) */
    contentSlot?: React.ReactNode;
    /** Требуются доработки **/
    isUnfinished?: boolean,
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({className, image, captionSlot, title, contentSlot, isUnfinished = false, onClick}: CardProps) => {
  return (
    <article className={cn(s.card, className)} onClick={onClick}>
      <div className={s.image__wrapper}><img src={image}/></div>
      <div className={s.card__content}>
        <div className={s.card__caption}>{captionSlot}</div>

        <div>
          <Text maxLines={2} color='primary' view={'p-16'}>{title}</Text>
          <div className={s.card__price}>{contentSlot}</div>
        </div>

        {isUnfinished && 
            <span className={s.unfinished}>
              <DotIcon />
              <Text view='p-14' color='accent'>Требует доработок</Text>
            </span>}
      </div>
    </article>
  );
};

export default Card;
