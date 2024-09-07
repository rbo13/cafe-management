import logger from 'loglevel'
import { getConnection } from '../database'

async function getService(location) {
  const conn = await getConnection()

  let query = `
    SELECT c.id, c.name, c.description, c.logo, c.location, COUNT(ec.employee_id) AS employees
    FROM cafes c
    LEFT JOIN employee_cafes ec ON c.id = ec.cafe_id
  `
  if (location) {
    query += ` WHERE c.location = COALESCE(NULLIF(?, ''), c.location) `
  }

  query += `
    GROUP BY c.id, c.name, c.description, c.logo, c.location
    ORDER BY employees DESC;
  `
  const sql = conn.format(query, [location])
  logger.info("Executing query: " + sql)
  return await conn.execute(sql)
}

async function upsertService(payload) {
  if (!payload) {
    logger.error("upsertService:: Payload is required")
    return
  }

  const conn = await getConnection()

  const {
    id,
    name,
    description,
    location
  } = payload

  const query = `
    INSERT INTO cafes (id, name, description, location)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      location = VALUES(location),
      description = VALUES(description);
  `

  try {
    const sql = conn.format(query, [id, name, description, location])
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
  getService,
  upsertService
}