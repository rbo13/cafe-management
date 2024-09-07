import { BASE_URL } from "./constants"

const fetchEmployees = async () => {
  const GET_EMPLOYEES_URL = `${BASE_URL}/employees`
  const response = await fetch(GET_EMPLOYEES_URL)
  
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return await response.json()
}

export {
  fetchEmployees
}