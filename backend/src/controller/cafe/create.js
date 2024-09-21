import { randomUUID } from "node:crypto"
import { upsertService } from '../../service/cafe'

function createCafe() {
  return async (req, res) => {
    const { name, description, location } = req.body
    let buffer = null
    let mimetype = ''
    if (req.file) {
      buffer = req.file.buffer
      mimetype = req.file.mimetype
    }
   
    let logo = null
    if (buffer !== null) {
      logo = buffer
    }

    const payload = {
      id: randomUUID(),
      name,
      description,
      location,
      mimetype,
      logo
    }

    try {
      await upsertService(payload)
      return res.status(201).json({
        message: "Success",
        data: {
          id: payload.id,
          name: payload.name
        }
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        data: null
      })
    }
  }
}


export { createCafe }