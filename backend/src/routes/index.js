import express from 'express'
import { cafeRoutes } from './cafes'
import { employeeRoutes } from './employees'
import { uploadFile } from './upload'

function v1Routes() {
  const router = express.Router()

  router.use('', cafeRoutes())
  router.use('', employeeRoutes())
  router.use('/upload', uploadFile())

  return router
}

export { v1Routes }