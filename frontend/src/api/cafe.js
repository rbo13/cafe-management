import { BASE_URL } from "./constants"

const fetchCafes = async () => {
  const GET_CAFES_URL = `${BASE_URL}/cafes`
  const response = await fetch(GET_CAFES_URL)
  
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return await response.json()
}

export {
  fetchCafes
}