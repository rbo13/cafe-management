import { useQuery } from '@tanstack/react-query'
import { fetchEmployees, searchEmployees } from '../api/employee'

const useEmployees = (searchTerm) => {
  return useQuery({
    queryKey: ['employees', searchTerm],
    queryFn: () => {
      if (searchTerm) {
        return searchEmployees(searchTerm)
      }

      return fetchEmployees()
    },
    select: (data) => {
      return data
    }
  })
}

export {
  useEmployees
}