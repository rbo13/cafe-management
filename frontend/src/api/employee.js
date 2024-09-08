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

const fetchEmployeeById = async (id) => {
  const GET_EMPLOYEE_BY_ID_URL = `${BASE_URL}/employees/${id}`
  const response = await fetch(GET_EMPLOYEE_BY_ID_URL)
  
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
    if (!response.ok) {
      const errorMessage = await response.json()
      throw new Error(errorMessage.message || 'Failed to add employee')
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

const updateEmployee = async (newEmployee) => {
  const UPDATE_EMPLOYEE_URL = `${BASE_URL}/employee`
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEmployee)
  }
  
  try {
    const response = await fetch(UPDATE_EMPLOYEE_URL, options)
    return await response.json()
  } catch (error) {
    throw error
  }
}

const deleteEmployee = async (id) => {
  const DELETE_EMPLOYEE_URL = `${BASE_URL}/employee/${id}`
  const options = {
    method: 'DELETE'
  }
  
  try {
    const response = await fetch(DELETE_EMPLOYEE_URL, options)
    return await response.json()
  } catch (error) {
    throw error
  }
}

export {
  fetchEmployees,
  searchEmployees,
  fetchEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
}