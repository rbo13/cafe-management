import logger from 'loglevel'

function getEmployee(db) {
  return async (req, res) => {
    let cafe = req.query.cafe || null

    const query = `
      SELECT 
        e.id,
        e.name,
        e.email_address,
        e.phone_number,
        DATEDIFF(CURDATE(), ec.start_date) AS days_worked,
        c.name AS cafe
      FROM 
        employees e
      LEFT JOIN 
        employee_cafes ec ON e.id = ec.employee_id
      LEFT JOIN 
        cafes c ON ec.cafe_id = c.id
      WHERE 
        (? IS NULL OR c.name = ?)
      ORDER BY 
        days_worked DESC;
    `

    try {
      const sql = db.format(query, [cafe, cafe])
      logger.info("Executing query: " + sql)
      const [rows] = await db.execute(sql)
      return res.status(200).json(rows)
    } catch (error) {
      return res.status(500).json({ message: 'Database query failed', error })
    }
  }
}

export {
  getEmployee
}