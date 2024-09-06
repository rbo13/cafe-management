import mysql from "mysql2/promise"

async function createDatabaseConnection(config) {
  return mysql.createPool(config)
}

export { createDatabaseConnection }