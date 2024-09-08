import logger from 'loglevel'
import { getCafeService, getCafeByIdService } from '../../service/cafe'

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

function getCafeById() {
  return async (req, res) => {
    const cafeId = req.params.id

    try {
      const [rows] = await getCafeByIdService(cafeId)
      if (rows.length > 0) {
        const cafe = rows[0]
        return res.status(200).json(cafe)
      }
      return res.status(404).json({ message: 'Cafe not found' })
    } catch (error) {
      logger.error(`Error fetching cafes: ${error.message}`)
      res.status(500).json({ message: 'Database query failed', error: error.message })
    }
  }
}

export {
  getCafe,
  getCafeById
}