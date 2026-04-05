import { z } from 'zod';
import { AutoParamsSchema, RealEstateParamsSchema, ElectronicsParamsSchema } from './params.schemas';

export const CategorySchema = z.enum([
  'auto',
  'real_estate',
  'electronics'
])

const BaseSchema = z.object({
  title: z
    .string()
    .min(1, 'Название должно быть заполнено')
    .max(100, 'Слишком длинное название'),

  price: z
    .number('Введите цену')
    .min(0, 'Цена не может быть отрицательной'),

  category: CategorySchema,

  description: z
    .string()
    .max(1000, 'Описание не может превышать 1000 символов')
    .optional()
    .default(''),
})

export const FormSchema = z.discriminatedUnion('category', [
  BaseSchema.extend({
    category: z.literal('auto'),
    params: AutoParamsSchema
  }),

  BaseSchema.extend({
    category: z.literal('real_estate'),
    params: RealEstateParamsSchema
  }),

  BaseSchema.extend({
    category: z.literal('electronics'),
    params: ElectronicsParamsSchema
  })
])
