import express from 'express'
import { getCafe, getCafeById } from '../../controller/cafe/get_cafe'
import { createCafe } from '../../controller/cafe/create'
import { updateCafe } from '../../controller/cafe/update'
import { deleteCafe } from '../../controller/cafe/delete'

function cafeRoutes() {
  const router = express.Router()

  router.get('/cafes', getCafe())
  router.get('/cafes/:id', getCafeById())
  router.post('/cafe', createCafe())
  router.put('/cafe', updateCafe())
  router.delete('/cafe/:id', deleteCafe())

  return router
}

export { cafeRoutes }