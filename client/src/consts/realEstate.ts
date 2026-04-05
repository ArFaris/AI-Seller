import { type Option } from 'types/dropdown';

export const REAL_ESTATE_TYPE_NAMES = {
    flat: 'Квартира',
    house: 'Дом',
    room: 'Комната',
} as const;

export const REAL_ESTATE_TYPE_OPTIONS: Option[] = [
    { key: 'flat', value: 'Квартира' },
    { key: 'house', value: 'Дом' },
    { key: 'room', value: 'Комната' },
];
