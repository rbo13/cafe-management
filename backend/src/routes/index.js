import express from 'express'
import { cafeRoutes } from './cafes'
import { employeeRoutes } from './employees'

function v1Routes() {
  const router = express.Router()

  router.use('', cafeRoutes())
  router.use('/employees', employeeRoutes())

  return router
}

export { v1Routes }