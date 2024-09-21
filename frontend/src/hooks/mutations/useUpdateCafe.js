import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { updateCafe } from '../../api/cafe'

const useUpdateCafe = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateCafe,
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
  useUpdateCafe
}