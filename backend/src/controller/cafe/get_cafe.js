import logger from 'loglevel'
import { getService } from '../../service/cafe'

function getCafe() {
  return async (req, res) => {
    
    let location = req.query.location
    if (location) {
      location = location.toLowerCase()
    }

    try {
      const [rows] = await getService(location)
      return res.status(200).json(rows)
    } catch (error) {
      logger.error(error.message)
      return res.status(500).json({ message: 'Database query failed', error })
    }
  }
}

export { getCafe }