import { BASE_URL } from "./constants"

const fetchCafes = async () => {
  const GET_CAFES_URL = `${BASE_URL}/cafes`
  const response = await fetch(GET_CAFES_URL)
  
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return await response.json()
}

const fetchCafeById = async (id) => {
  const GET_CAFE_BY_ID_URL = `${BASE_URL}/cafes/${id}`
  const response = await fetch(GET_CAFE_BY_ID_URL)
  
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

const updateCafe = async (newCafe) => {
  const UPDATE_CAFE_URL = `${BASE_URL}/cafe`
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCafe)
  }
  
  try {
    const response = await fetch(UPDATE_CAFE_URL, options)
    return await response.json()
  } catch (error) {
    throw error
  }
}

const addCafe = async (cafe) => {
  const ADD_CAFE_URL = `${BASE_URL}/cafe`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cafe)
  }
  
  try {
    const response = await fetch(ADD_CAFE_URL, options)
    return await response.json()
  } catch (error) {
    throw error
  }
}

export {
  fetchCafes,
  searchCafes,
  fetchCafeById,
  updateCafe,
  addCafe
}