import { type Option } from 'types/dropdown';

export const CATEGORY_NAMES = {
    auto: 'Авто',
    real_estate: 'Недвижимость',
    electronics: 'Электроника'
} as const;

export const CATEGORY_OPTIONS: Option[] = [
   { key: 'auto', value: 'Авто' },
   { key: 'real_estate', value: 'Недвижимость' },
   { key: 'electronics', value: 'Электроника' },
]
