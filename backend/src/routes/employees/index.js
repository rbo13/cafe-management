import express from 'express'
import { getEmployee } from '../../controller/employee/get_employee'
import { createEmployee } from '../../controller/employee/create'

function employeeRoutes() {
  const router = express.Router()

  router.get('/employees', getEmployee())
  router.post('/employee', createEmployee())

  return router
}



export { employeeRoutes }