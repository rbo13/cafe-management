import { useQuery } from '@tanstack/react-query'
import { fetchCafeById, fetchCafes, searchCafes } from '../api/cafe'

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

const useCafe = (cafeId) => {
  return useQuery({
    queryKey: ['cafe', cafeId],
    queryFn: () => {
      return fetchCafeById(cafeId)
    },
    select: (data) => {
      return data
    }
  })
}

export {
  useCafes,
  useCafe
}