import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { updateEmployee } from '../../api/employee'

const useUpdateEmployee = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee', 'employees'] })
      navigate({
        to: '/employees'
      })
    },
    onError: (error) => {
      console.error('Error updating employee:', error.message)
    }
  })
}

export {
  useUpdateEmployee
}