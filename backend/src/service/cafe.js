import logger from 'loglevel'
import { getConnection } from '../database'

async function getCafeService(location) {
  const conn = await getConnection()

  try {
    let query = `
      SELECT
        c.name,
        c.description,
        COUNT(e.id) AS employees,
        c.logo,
        c.location,
        c.id,
        COALESCE(
          JSON_ARRAYAGG(
            CASE
              WHEN e.id IS NOT NULL THEN JSON_OBJECT(
                'employee_id', e.id,
                'employee_name', e.name,
                'employee_email', e.email_address,
                'phone_number', e.phone_number,
                'employee_gender', e.gender, 
                'start_date', ec.start_date
              )
              ELSE JSON_OBJECT()
            END
          ),
          JSON_ARRAY()
        ) AS employees_working
      FROM cafes c
      LEFT JOIN employee_cafes ec ON c.id = ec.cafe_id
      LEFT JOIN employees e ON ec.employee_id = e.id
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
  } catch (error) {
    logger.error(`Database query failed: ${error.message}`)
    throw error
  } finally {
    conn.release()
  }
}

async function getCafeByName(name) {
  const conn = await getConnection()
  try {
    const query = `SELECT * FROM cafes WHERE name = ? LIMIT 1;`
  
    const sql = conn.format(query, [name])
    logger.info("Executing query: " + sql)
    return await conn.execute(sql)
  } catch {
    logger.error(`Database query failed: ${error.message}`)
    throw error
  } finally {
    conn.release()
  }
}

async function getCafeByIdService(id) {
  const conn = await getConnection()
  try {
    const query = `SELECT * FROM cafes WHERE id = ? LIMIT 1;`
  
    const sql = conn.format(query, [id])
    logger.info("Executing query: " + sql)
    return await conn.execute(sql)
  } catch {
    logger.error(`Database query failed: ${error.message}`)
    throw error
  } finally {
    conn.release()
  }
}

async function uploadLogoService(payload) {
  const {
    cafeId,
    mimetype,
    logo
  } = payload

  const conn = await getConnection()
  const query = `UPDATE cafes
    SET
      logo = ?,
      mimetype = ?
    WHERE
      id = ? LIMIT 1;
  `

  try {
    const sql = conn.format(query, [logo, mimetype, cafeId])
    await conn.beginTransaction()
    await conn.execute(sql)
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
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
    logo,
    mimetype,
    location
  } = payload

  const query = `
    INSERT INTO cafes (id, name, description, logo, mimetype, location)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      description = VALUES(description),
      logo = VALUES(logo),
      mimetype = VALUES(mimetype),
      location = VALUES(location);
  `
  const returningQuery = `SELECT * FROM cafes WHERE id = ? LIMIT 1;`

  try {
    const sql = conn.format(query, [id, name, description, logo, mimetype, location])
    await conn.beginTransaction()
    await conn.execute(sql)
    const [rows] = await conn.execute(returningQuery, [id])
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

async function deleteCafeService(id) {
  const conn = await getConnection()

  const query = `DELETE FROM cafes WHERE id = ? LIMIT 1;`

  try {
    const sql = conn.format(query, [id])
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
  getCafeService,
  getCafeByName,
  getCafeByIdService,
  upsertService,
  deleteCafeService,
  uploadLogoService
}