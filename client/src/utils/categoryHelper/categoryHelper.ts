import { CATEGORY_CONFIG } from 'config/categoryConfig'
import type { CategoryType } from 'types/category'
import type { Option } from 'types/dropdown'

export type FieldConfig = {
  key: string
  label: string
  type: 'input' | 'dropdown'
  value: any
  options?: Option[]
  isEmpty: boolean
}

class CategoryHelper {
  formatParams(
    category: CategoryType,
    params: Record<string, any>
  ): FieldConfig[] {
    const config = CATEGORY_CONFIG[category];

    return Object.entries(config).map(([key, field]) => {
      const value = field.options?.find(option => option.key === params?.[key])?.value || params?.[key];

      return {
        key,
        label: field.label,
        type: field.type,
        value,
        options: field.options || [],
        isEmpty: value === undefined || value === null || value === ''
      };
    })
  }

  getUnfilledParams(
    category: CategoryType,
    params: Record<string, any>
  ): string[] {
    const config = CATEGORY_CONFIG[category];

    return Object.entries(config)
      .filter(([key]) => {
        const value = params?.[key];
        return value === undefined || value === null || value === '';
      })
      .map(([_, field]) => field.label);
  }
}

export default new CategoryHelper();
