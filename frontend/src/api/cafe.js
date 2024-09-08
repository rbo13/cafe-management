import { BASE_URL } from "./constants"

const fetchCafes = async () => {
  const GET_CAFES_URL = `${BASE_URL}/cafes`
  const response = await fetch(GET_CAFES_URL)
  
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return await response.json()
}

const searchCafes = async (location) => {
  const SEARCH_CAFES_URL = `${BASE_URL}/cafes?location=${location}`
  const response = await fetch(SEARCH_CAFES_URL)

  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return await response.json()
}

export {
  fetchCafes,
  searchCafes
}