import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateEmployee } from '../../api/employee'

const useUpdateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee'] })
    },
    onError: (error) => {
      console.error('Error updating employee:', error.message)
    }
  })
}

export {
  useUpdateEmployee
}