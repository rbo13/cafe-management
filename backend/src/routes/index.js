import express from 'express'
import { cafeRoutes } from './cafes'
import { employeeRoutes } from './employees'

function v1Routes(db) {
  const router = express.Router()

  router.use('/cafes', cafeRoutes(db))
  router.use('/employees', employeeRoutes(db))

  return router
}

export { v1Routes }