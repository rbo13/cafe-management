import logger from 'loglevel'
import { getCafeService } from '../../service/cafe'

function getCafe() {
  return async (req, res) => {
    
    let location = req.query.location
    if (location) {
      location = location.toLowerCase()
    }

    try {
      const [rows] = await getCafeService(location)
      res.status(200).json(rows)
    } catch (error) {
      logger.error(`Error fetching cafes: ${error.message}`)
      res.status(500).json({ message: 'Database query failed', error: error.message })
    }
  }
}

export { getCafe }