import { deleteCafeService } from "../../service/cafe"

function deleteCafe() {
  return async (req, res) => {
    const cafeId = req.params.id

    try {
      await deleteCafeService(cafeId)
      return res.status(200).send({
        message: 'Cafe deleted successfully!'
      })
    } catch (error) {
      return res.status(404).json({
        message: error.message
      })
    }
    
  }
}

export {
  deleteCafe
}