import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { addEmployee } from '../../api/employee'

const useAddEmployee = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
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
  useAddEmployee
}