import { randomUUID } from "node:crypto"
import { upsertService } from '../../service/cafe'

function createCafe() {
  return async (req, res) => {
    const { id } = req.body
    let newId;

    if (id === undefined) {
      newId = randomUUID()
    } else {
      newId = id
    }

    const payload = {
      id: newId,
      ...req.body
    }

    try {
      await upsertService(payload)
      return res.status(201).json({
        message: "Success",
        data: payload
      })
    } catch(error) {
      return res.status(500).json({
        message: error.message,
        data: payload
      })
    }
  }
}



export { createCafe }