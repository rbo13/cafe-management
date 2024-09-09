import express from 'express'
import multer from 'multer'
import { handleUpload } from '../controller/upload'


function uploadFile() {
  const router = express.Router()

  const storage = multer.memoryStorage()
  const upload = multer({
    storage: storage
  })

  router.post('', upload.single('logo'), handleUpload())

  return router
}

export { uploadFile }