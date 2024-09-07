import express from 'express'
import { getEmployee } from '../../controller/employee/get_employee'

function employeeRoutes(db) {
  const router = express.Router()

  router.get('/', getEmployee(db))

  return router
}



export { employeeRoutes }