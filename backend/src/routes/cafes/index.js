import express from 'express'
import { getCafe } from '../../controller/cafe/get_cafe'
import { createCafe } from '../../controller/cafe/create'

function cafeRoutes(db) {
  const router = express.Router()

  router.get('/cafes', getCafe(db))
  router.post('/cafe', createCafe(db))

  return router
}

export { cafeRoutes }