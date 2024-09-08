import { BASE_URL } from "./constants"

const fetchEmployees = async () => {
  const GET_EMPLOYEES_URL = `${BASE_URL}/employees`
  const response = await fetch(GET_EMPLOYEES_URL)
  
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return await response.json()
}

const searchEmployees = async (cafeName) => {
  const SEARCH_EMPLOYEE_URL = `${BASE_URL}/employees?cafe=${cafeName}`
  const response = await fetch(SEARCH_EMPLOYEE_URL)
  
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return await response.json()
}

const addEmployee = async (employee) => {
  const ADD_EMPLOYEE_URL = `${BASE_URL}/employee`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  }
  
  try {
    const response = await fetch(ADD_EMPLOYEE_URL, options)
    return await response.json()
  } catch (error) {
    throw error
  }
}

export {
  fetchEmployees,
  searchEmployees,
  addEmployee
}