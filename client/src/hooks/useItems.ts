import { useQuery } from '@tanstack/react-query';
import { getItems } from 'api/api';

export const useItems = (params?: {
  q?: string
  limit?: number
  skip?: number,
  sortColumn?: string,
  sortDirection?: string
  categories?: string
}) => {
  return useQuery({
    queryKey: ['items', params],
    queryFn: () => getItems(params),
    placeholderData: (previousData) => previousData
  })
}
