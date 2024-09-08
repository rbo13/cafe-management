import express from 'express'
import { getEmployee, getEmployeeById } from '../../controller/employee/get_employee'
import { createEmployee } from '../../controller/employee/create'
import { updateEmployee } from '../../controller/employee/update_employee'
import { deleteEmployee } from '../../controller/employee/delete'

function employeeRoutes() {
  const router = express.Router()

  router.get('/employees', getEmployee())
  router.get('/employees/:id', getEmployeeById())
  router.post('/employee', createEmployee())
  router.put('/employee', updateEmployee())
  router.delete('/employee/:id', deleteEmployee())

  return router
}



export { employeeRoutes }