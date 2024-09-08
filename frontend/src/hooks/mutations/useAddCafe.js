import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { addCafe } from '../../api/cafe'

const useAddCafe = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: addCafe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cafes'] })
      navigate({
        to: '/cafes'
      })
    },
    onError: (error) => {
      console.error('Error updating cafe:', error.message)
    }
  })
}

export {
  useAddCafe
}