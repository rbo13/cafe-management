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

  let newStartDate;

  if (start_date === undefined) {
    newStartDate = new Date().toISOString().split('T')[0]
  } else {
    newStartDate = start_date
  }

  const query = `
    INSERT INTO employee_cafes (employee_id, cafe_id, start_date)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
      employee_id = VALUES(employee_id),
      cafe_id = VALUES(cafe_id),
      start_date = VALUES(start_date);
  `

  try {
    const sql = conn.format(query, [employee_id, cafe_id, newStartDate])
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

async function createEmployeeCafeService(payload) {
  if (!payload) {
    logger.error("createEmployeeCafeService:: Payload is required")
    return
  }

  const conn = await getConnection()

  const {
    employee_id,
    cafe_id,
    start_date
  } = payload

  let newStartDate;

  if (start_date === undefined) {
    newStartDate = new Date().toISOString().split('T')[0]
  } else {
    newStartDate = start_date
  }

  const query = `
    INSERT INTO employee_cafes (employee_id, cafe_id, start_date)
    VALUES (?, ?, ?);
  `
  const returningQuery = `SELECT * FROM employee_cafes WHERE employee_id = ? AND cafe_id = ? LIMIT 1;`

  try {
    const sql = conn.format(query, [employee_id, cafe_id, newStartDate])
    await conn.beginTransaction()
    await conn.execute(sql)

    const [rows] = await conn.execute(returningQuery, [employee_id, cafe_id])
    await conn.commit()

    logger.info("Executing query: " + sql)
    return rows.length > 0 ? rows[0] : null
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export {
  upsertService,
  createEmployeeCafeService
}