import { upsertService } from "../../service/cafe"

function updateCafe() {
  return async (req, res) => {
    const payload = {
      ...req.body
    }

    try {
      const result = await upsertService(payload)
      return res.status(200).json({
        message: "Success",
        data: result
      })
    } catch(error) {
      return res.status(400).json({
        message: error.message,
        data: payload
      })
    }
  }
}



export { updateCafe }