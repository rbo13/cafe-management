import express from 'express'
import multer from 'multer'
import { handleUpload } from '../controller/upload'


function uploadFile() {
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

  router.post('', upload.single('logo'), handleUpload())

  return router
}

export { uploadFile }