import logger from 'loglevel'
import { getConnection } from '../database'

async function getService(cafe) {
  const conn = await getConnection()

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

  const sql = conn.format(query, [cafe, cafe])
  logger.info("Executing query: " + sql)

  return await conn.execute(sql)
}

export {
  getService
}