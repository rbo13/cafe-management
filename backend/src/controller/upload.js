import { uploadLogoService } from "../service/cafe"

function handleUpload() {
  return async (req, res) => {
    const { cafeId } = req.body
    const file = req.file
    const { buffer, mimetype} = file

    try {
      await uploadLogoService({
        cafeId,
        mimetype,
        logo: buffer
      })
      return res.status(200).json({
        message: 'File uploaded successfully!',
        mimetype
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