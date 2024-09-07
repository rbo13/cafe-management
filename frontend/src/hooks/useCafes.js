import { useQuery } from '@tanstack/react-query'
import { fetchCafes } from '../api/cafe'

const useCafes = () => {
  return useQuery({
    queryKey: ['cafes'],
    queryFn: fetchCafes
  })
}

export {
  useCafes
}