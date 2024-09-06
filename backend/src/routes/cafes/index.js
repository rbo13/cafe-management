import express from 'express'
import logger from 'loglevel'

function cafeRoutes(db) {
  const router = express.Router()

  router.get('/', index(db))

  return router
}

function index(db) {
  return async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM cafes')
      return res.status(200).json(rows)
    } catch (error) {
      return res.status(500).json({ message: 'Database query failed', error })
    }
  }
}


export { cafeRoutes }