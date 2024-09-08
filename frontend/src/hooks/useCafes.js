import { useQuery } from '@tanstack/react-query'
import { fetchCafes, searchCafes } from '../api/cafe'

const useCafes = (searchTerm) => {
  return useQuery({
    queryKey: ['cafes', searchTerm],
    queryFn: () => {
      if (searchTerm) {
        return searchCafes(searchTerm)
      }

      return fetchCafes()
    },
    select: (data) => {
      return data
    }
  })
}

export {
  useCafes
}