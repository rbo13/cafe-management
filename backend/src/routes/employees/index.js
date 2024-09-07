import express from 'express'
import { getEmployee } from '../../controller/employee/get_employee'

function employeeRoutes() {
  const router = express.Router()

  router.get('/', getEmployee())

  return router
}



export { employeeRoutes }