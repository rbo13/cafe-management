import express from 'express'
import { getCafe } from '../../controller/cafe/get_cafe'
import { createCafe } from '../../controller/cafe/create'
import { updateCafe } from '../../controller/cafe/update'

function cafeRoutes() {
  const router = express.Router()

  router.get('/cafes', getCafe())
  router.post('/cafe', createCafe())
  router.put('/cafe', updateCafe())

  return router
}

export { cafeRoutes }