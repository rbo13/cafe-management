import express from 'express'
import logger from 'loglevel'

function cafeRoutes(db) {
  const router = express.Router()

  router.get('/', index(db))

  return router
}

function index(db) {
  return async (req, res) => {
    let location = req.query.location
    logger.info("Query Params: " + location)
    let sql = `
      SELECT c.id, c.name, c.description, c.logo, c.location, COUNT(ec.employee_id) AS employees
      FROM cafes c
      LEFT JOIN employee_cafes ec ON c.id = ec.cafe_id
    `
    if (location) {
      location = location.toLowerCase()
      sql += ` WHERE c.location = COALESCE(NULLIF(?, ''), c.location) `
    }

    sql += `
      GROUP BY c.id, c.name, c.description, c.logo, c.location
      ORDER BY employees DESC;
    `

    try {
      logger.info("Executing query: " + sql)
      const [rows] = await db.query(sql, [location])
      return res.status(200).json(rows)
    } catch (error) {
      return res.status(500).json({ message: 'Database query failed', error })
    }
  }
}


export { cafeRoutes }