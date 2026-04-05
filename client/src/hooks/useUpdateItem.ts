import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateItem } from 'api/api'

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateItem(id, data),
    
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['item', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['items'] });
    }
  });
}
