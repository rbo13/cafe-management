import express from 'express'
import multer from 'multer'
import { getCafe, getCafeById, getCafeLogo } from '../../controller/cafe/get_cafe'
import { createCafe } from '../../controller/cafe/create'
import { updateCafe } from '../../controller/cafe/update'
import { deleteCafe } from '../../controller/cafe/delete'

function cafeRoutes() {
  const router = express.Router()

  const storage = multer.memoryStorage()

  const upload = multer({
    storage: storage,
    limits: {
      // set limit to 2mb
      fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image")) {
        cb(null, true);
      } else {
        cb("Only image are supported", false);
      }
    }
  })

  router.get('/cafes', getCafe())
  router.get('/cafes/:id', getCafeById())
  router.get('/cafes/:id/logo', getCafeLogo())
  router.post('/cafe', upload.single('logo'), createCafe())
  router.put('/cafe', upload.single('logo'), updateCafe())
  router.delete('/cafe/:id', deleteCafe())

  return router
}

export { cafeRoutes }