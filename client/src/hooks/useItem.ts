import { useQuery } from '@tanstack/react-query';
import { getItem } from 'api/api';

export const useItem = (id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['items', id],
    queryFn: () => getItem(id),
    enabled: !!id && (options?.enabled ?? true)
  })
}
