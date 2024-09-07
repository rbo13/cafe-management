const BASE_URL = "http://127.0.0.1:3000/api/v1"

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