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

const fetchCafeLogo = async (id) => {
  const GET_CAFE_LOGO_URL = `${BASE_URL}/cafes/${id}/logo`
  const response = await fetch(GET_CAFE_LOGO_URL)
  
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  const blob = await response.blob()
  const base64Logo = await getBase64Encoding(blob)
  return base64Logo
}

const searchCafes = async (location) => {
  const SEARCH_CAFES_URL = `${BASE_URL}/cafes?location=${location}`
  const response = await fetch(SEARCH_CAFES_URL)

  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return await response.json()
}

const updateCafe = async (formData) => {
  const UPDATE_CAFE_URL = `${BASE_URL}/cafe`
  const options = {
    method: 'PUT',
    body: formData
  }
  
  try {
    const response = await fetch(UPDATE_CAFE_URL, options)
    return await response.json()
  } catch (error) {
    throw error
  }
}

const addCafe = async (formData) => {
  const ADD_CAFE_URL = `${BASE_URL}/cafe`
  const options = {
    method: 'POST',
    body: formData
  }
  
  try {
    const response = await fetch(ADD_CAFE_URL, options)
    if (!response.ok) {
      const errorMessage = await response.json()
      throw new Error(errorMessage.message || 'Failed to add cafe')
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

const deleteCafe = async (id) => {
  const DELETE_CAFE_URL = `${BASE_URL}/cafe/${id}`
  const options = {
    method: 'DELETE'
  }
  
  try {
    const response = await fetch(DELETE_CAFE_URL, options)
    return await response.json()
  } catch (error) {
    throw error
  }
}

const uploadCafeLogo = async (formData) => {
  const UPLOAD_CAFE_LOGO_URL = `${BASE_URL}/upload`
  const options = {
    method: 'POST',
    body: formData
  }

  try {
    const response = await fetch(UPLOAD_CAFE_LOGO_URL, options)
    return await response.json()
  } catch (error) {
    throw error
  }
}

const getBase64Encoding = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export {
  fetchCafes,
  searchCafes,
  fetchCafeById,
  fetchCafeLogo,
  uploadCafeLogo,
  updateCafe,
  addCafe,
  deleteCafe
}