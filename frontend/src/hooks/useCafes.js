import { useQuery } from '@tanstack/react-query'
import { fetchCafeById, fetchCafes, searchCafes, fetchCafeLogo } from '../api/cafe'

const useCafes = (searchTerm) => {
  return useQuery({
    queryKey: ['cafes', searchTerm],
    refetchOnWindowFocus: false,
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

const useCafeLogo = (cafeId) => {
  return useQuery({
    queryKey: ['logo', cafeId],
    refetchOnWindowFocus: false,
    queryFn: () => {
      return fetchCafeLogo(cafeId)
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
  useCafeLogo,
  useCafe
}