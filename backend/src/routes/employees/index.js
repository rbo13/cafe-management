import express from 'express'
import { getEmployee } from '../../controller/employee/get_employee'
import { createEmployee } from '../../controller/employee/create'
import { updateEmployee } from '../../controller/employee/update_employee'

function employeeRoutes() {
  const router = express.Router()

  router.get('/employees', getEmployee())
  router.post('/employee', createEmployee())
  router.put('/employee', updateEmployee())

  return router
}



export { employeeRoutes }