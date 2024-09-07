import logger from 'loglevel'

function getCafe(db) {
  return async (req, res) => {
    let location = req.query.location

    let query = `
      SELECT c.id, c.name, c.description, c.logo, c.location, COUNT(ec.employee_id) AS employees
      FROM cafes c
      LEFT JOIN employee_cafes ec ON c.id = ec.cafe_id
    `
    if (location) {
      location = location.toLowerCase()
      query += ` WHERE c.location = COALESCE(NULLIF(?, ''), c.location) `
    }

    query += `
      GROUP BY c.id, c.name, c.description, c.logo, c.location
      ORDER BY employees DESC;
    `

    try {
      const sql = db.format(query, [location])
      logger.info("Executing query: " + sql)
      const [rows] = await db.execute(sql)
      return res.status(200).json(rows)
    } catch (error) {
      return res.status(500).json({ message: 'Database query failed', error })
    }
  }
}

export { getCafe }