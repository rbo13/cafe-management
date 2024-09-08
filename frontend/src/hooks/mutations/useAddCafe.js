import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCafe } from '../../api/cafe'

const useAddCafe = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCafe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cafes'] })
    },
    onError: (error) => {
      console.error('Error updating cafe:', error.message)
    }
  })
}

export {
  useAddCafe
}