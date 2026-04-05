import { REAL_ESTATE_TYPE_OPTIONS } from 'consts/realEstate';
import { ELECTRONICS_TYPE_OPTIONS, CONDITION_OPTIONS } from 'consts/electronics';
import { TRANSMISSION_OPTIONS } from 'consts/auto';
import type { Option } from 'types/dropdown';
import type { CategoryType } from 'types/category';

type FieldType = 'input' | 'dropdown';

type FieldDefinition = {
  label: string
  type: FieldType
  options?: Option[]
}

export const CATEGORY_CONFIG: Record<
  CategoryType,
  Record<string, FieldDefinition>
> = {
  real_estate: {
    type: {
      label: 'Тип недвижимости',
      type: 'dropdown',
      options: REAL_ESTATE_TYPE_OPTIONS
    },
    address: {
      label: 'Адрес',
      type: 'input'
    },
    area: {
      label: 'Площадь',
      type: 'input'
    },
    floor: {
      label: 'Этаж',
      type: 'input'
    }
  },

  electronics: {
    type: {
      label: 'Тип устройства',
      type: 'dropdown',
      options: ELECTRONICS_TYPE_OPTIONS
    },
    brand: {
      label: 'Бренд',
      type: 'input'
    },
    model: {
      label: 'Модель',
      type: 'input'
    },
    condition: {
      label: 'Состояние',
      type: 'dropdown',
      options: CONDITION_OPTIONS
    },
    color: {
      label: 'Цвет',
      type: 'input'
    }
  },

  auto: {
    brand: {
      label: 'Бренд',
      type: 'input'
    },
    model: {
      label: 'Модель',
      type: 'input'
    },
    yearOfManufacture: {
      label: 'Год выпуска',
      type: 'input'
    },
    transmission: {
      label: 'Коробка передач',
      type: 'dropdown',
      options: TRANSMISSION_OPTIONS
    },
    mileage: {
      label: 'Пробег',
      type: 'input'
    },
    enginePower: {
      label: 'Мощность двиг.',
      type: 'input'
    }
  }
}
