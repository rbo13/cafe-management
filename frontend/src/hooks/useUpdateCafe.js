import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCafe } from '../api/cafe'

const useUpdateCafe = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCafe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cafes'] })
    },
    onError: (error) => {
      console.error('Error updating cafe:', error.message)
    }
  })
}

export {
  useUpdateCafe
}