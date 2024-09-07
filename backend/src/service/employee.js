import logger from 'loglevel'
import { randomInt } from "node:crypto"
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

async function createEmployeeService(payload) {
  if (!payload) {
    logger.error("createEmployeeService:: Payload is required")
    return
  }

  const conn = await getConnection()

  const {
    employee_name,
    email_address,
    phone_number,
    gender
  } = payload

  const id = generateEmployeeId(8)

  const query = `
    INSERT INTO employees (id, name, email_address, phone_number, gender)
    VALUES (?, ?, ?, ?, ?);
  `

  const returningQuery = `SELECT * FROM employees WHERE id = ? LIMIT 1;`

  try {
    const sql = conn.format(query, [id, employee_name, email_address, phone_number, gender])
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

async function upsertService(payload) {
  if (!payload) {
    logger.error("upsertService:: Payload is required")
    return
  }

  const conn = await getConnection()

  const {
    employee_name,
    email_address,
    phone_number,
    gender
  } = payload

  const id = generateEmployeeId(8)

  const query = `
    INSERT INTO employees (id, name, email_address, phone_number, gender)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      email_address = VALUES(email_address),
      phone_number = VALUES(phone_number);
  `
  const returningQuery = `SELECT * FROM employees WHERE id = ? LIMIT 1;`

  try {
    const sql = conn.format(query, [id, employee_name, email_address, phone_number, gender])
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

async function getEmployeeByName(name) {
  const conn = await getConnection()
  const query = `SELECT * FROM employees WHERE name = ? LIMIT 1;`

  const sql = conn.format(query, [name])
  logger.info("Executing query: " + sql)
  return await conn.execute(sql)
}

async function getEmployeeById(id) {
  const conn = await getConnection()
  const query = `SELECT * FROM employees WHERE id = ? LIMIT 1;`

  const sql = conn.format(query, [id])
  logger.info("Executing query: " + sql)
  return await conn.execute(sql)
}

async function deleteEmployeeService(id) {
  const conn = await getConnection()

  const query = `DELETE FROM employees WHERE id = ? LIMIT 1;`

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

function generateEmployeeId(size) {
  const prefix = 'UI'
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = prefix

  for (let i = 0; i < size; i++) {
    const randomIndex = randomInt(0, characters.length);
    id += characters[randomIndex];
  }

  return id
}

export {
  getService,
  createEmployeeService,
  upsertService,
  getEmployeeByName,
  getEmployeeById,
  deleteEmployeeService
}