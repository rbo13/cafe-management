import logger from 'loglevel'
import { randomInt, randomUUID } from "node:crypto"

function createCafe(db) {
  return async (req, res) => {
    const {
      name,
      description,
      location
    } = req.body

    const id = randomUUID()

    const query = `
      INSERT INTO cafes (id, name, description, location)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        location = VALUES(location),
        description = VALUES(description);
    `
    const conn = await db.getConnection()

    try {
      const sql = conn.format(query, [id, name, description, location])
      await conn.beginTransaction()
      await conn.execute(sql)
      await conn.commit()
      logger.info("Executing query: " + sql)

      return res.status(201).json({ message: "Created successfully!", data: { id, name, location }})
    } catch (error) {
      conn.rollback()

      return res.status(500).json({ message: 'Database query failed', error })
    } finally {
      conn.release()
    }
  }
}



export { createCafe }