import { uploadLogoService } from "../service/cafe"

function handleUpload() {
  return async (req, res) => {
    const { cafeId } = req.body
    const logo = req.file.buffer

    try {
      await uploadLogoService({
        cafeId,
        logo
      })
      return res.status(200).json({
        message: 'File uploaded successfully!'
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        data: null
      })
    }
  }
}

export {
  handleUpload
}