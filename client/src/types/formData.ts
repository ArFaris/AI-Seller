import type { CategoryType } from "types/category";

export type ProductFormData = {
  title: string;
  price: number;
  category: CategoryType;
  params: Record<string, any>;
  description: string; 
}
