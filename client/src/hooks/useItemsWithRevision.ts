import { useQueries } from '@tanstack/react-query';
import { getItem } from 'api/api';
import { CATEGORY_CONFIG } from 'config/categoryConfig';
import type { CategoryType } from 'types/category';

export const useItemsRevision = (items: { id: string; category: string }[] | undefined) => {
  const results = useQueries({
    queries: (items || []).map(item => ({
      queryKey: ['item', item.id],
      queryFn: () => getItem(item.id),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const needsRevisionMap = new Map<string, boolean>();
  
  results.forEach((result, index) => {
    if (result.data && items?.[index]) {
      const item = result.data;
      const category = item.category as CategoryType;

      const expectedFields = Object.keys(CATEGORY_CONFIG[category] || {});
      const totalExpected = expectedFields.length;
      
      let filledCount = 0;
      expectedFields.forEach(field => {
        const value = item.params?.[field];
        if (value !== undefined && value !== null && value !== '') {
          filledCount++;
        }
      });

      const needsRevision = filledCount < totalExpected;
      needsRevisionMap.set(items[index].id, needsRevision);
    }
  });

  return { 
    needsRevisionMap, 
    isLoading: results.some(r => r.isLoading) 
  };
};
