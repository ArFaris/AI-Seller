import { z } from 'zod';

const YearSchema = z
  .number({ message: 'Год должен быть числом' })
  .int('Год должен быть целым числом')
  .min(1900, 'Год не может быть раньше 1900')
  .max(new Date().getFullYear() + 1, 'Год не может быть в будущем')
  .optional()
  .nullable();

export const AutoParamsSchema = z.object({
  brand: z
    .string({ message: 'Бренд должен быть строкой' })
    .min(1, 'Введите бренд')
    .optional()
    .nullable(),
  model: z
    .string({ message: 'Модель должна быть строкой' })
    .min(1, 'Введите модель')
    .optional()
    .nullable(),
  yearOfManufacture: YearSchema,
  transmission: z
    .enum(['automatic', 'manual'], { message: 'Выберите тип коробки' })
    .optional()
    .nullable(),
  mileage: z
    .number({ message: 'Пробег должен быть числом' })
    .positive('Пробег не может быть отрицательным')
    .optional()
    .nullable(),
  enginePower: z
    .number({ message: 'Мощность должна быть числом' })
    .int('Мощность должна быть целым числом')
    .positive('Мощность не может быть отрицательной')
    .optional()
    .nullable()
});

export const RealEstateParamsSchema = z.object({
  type: z
    .enum(['flat', 'house', 'room'], { message: 'Выберите тип недвижимости' })
    .optional()
    .nullable(),
  address: z
    .string({ message: 'Адрес должен быть строкой' })
    .min(1, 'Введите адрес')
    .optional()
    .nullable(),
  area: z
    .number({ message: 'Площадь должна быть числом' })
    .positive('Площадь не может быть отрицательной')
    .optional()
    .nullable(),
  floor: z
    .number({ message: 'Этаж должен быть числом' })
    .int('Этаж должен быть целым числом')
    .positive('Этаж не может быть отрицательным')
    .optional()
    .nullable()
});

export const ElectronicsParamsSchema = z.object({
  type: z
    .enum(['phone', 'laptop', 'misc'], { message: 'Выберите тип устройства' })
    .optional()
    .nullable(),
  brand: z
    .string({ message: 'Бренд должен быть строкой' })
    .min(1, 'Введите бренд')
    .optional()
    .nullable(),
  model: z
    .string({ message: 'Модель должна быть строкой' })
    .min(1, 'Введите модель')
    .optional()
    .nullable(),
  condition: z
    .enum(['new', 'used'], { message: 'Выберите состояние' })
    .optional()
    .nullable(),
  color: z
    .string({ message: 'Цвет должен быть строкой' })
    .min(1, 'Введите цвет')
    .optional()
    .nullable()
});
