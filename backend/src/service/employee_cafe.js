import logger from 'loglevel'
import { getConnection } from '../database'

async function upsertService(payload) {
  if (!payload) {
    logger.error("upsertService:: Payload is required")
    return
  }

  const conn = await getConnection()

  const {
    employee_id,
    cafe_id,
    start_date
  } = payload

  const query = `
    INSERT INTO employee_cafes (employee_id, cafe_id, start_date)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
      employee_id = VALUES(employee_id),
      cafe_id = VALUES(cafe_id),
      start_date = VALUES(start_date);
  `

  try {
    const sql = conn.format(query, [employee_id, cafe_id, start_date])
    await conn.beginTransaction()
    await conn.execute(sql)
    await conn.commit()
    logger.info("Executing query: " + sql)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export {
  upsertService
}