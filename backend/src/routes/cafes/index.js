import express from 'express'
import { getCafe } from '../../controller/cafe/get_cafe'
import { createCafe } from '../../controller/cafe/create'

function cafeRoutes() {
  const router = express.Router()

  router.get('/cafes', getCafe())
  router.post('/cafe', createCafe())

  return router
}

export { cafeRoutes }