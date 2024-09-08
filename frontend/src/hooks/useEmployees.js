import { useQuery } from '@tanstack/react-query'
import { fetchEmployeeById, fetchEmployees, searchEmployees } from '../api/employee'

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

const useEmployee = (employeeId) => {
  return useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => {
      return fetchEmployeeById(employeeId)
    },
    select: (data) => {
      return data
    }
  })
}

export {
  useEmployees,
  useEmployee
}