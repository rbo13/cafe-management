import { useQuery } from '@tanstack/react-query'
import { fetchEmployees } from '../api/employee'

const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees
  })
}

export {
  useEmployees
}