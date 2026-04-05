import { useMutation } from '@tanstack/react-query';
import { generateDescription, suggestPrice } from 'services/llmService';
import type { ProductFormData } from 'types/formData';

export const useGenerateDescription = () => {
  return useMutation({
    mutationFn: (product: ProductFormData) => generateDescription(product),
    
    onError: (error) => {
      console.error('Description generation failed:', error);
    }
  });
};

export const useSuggestPrice = () => {
  return useMutation({
    mutationFn: (product: ProductFormData) => suggestPrice(product),
    
    onError: (error) => {
      console.error('Price suggestion failed:', error);
    }
  });
};
