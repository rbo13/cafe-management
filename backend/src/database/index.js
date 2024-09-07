import mysql from "mysql2/promise"

let pool;

async function createDatabaseConnection(config) {
  if (!pool) {
    pool = mysql.createPool(config)
  }
  
  return pool
}

async function getConnection() {
  if (!pool) {
    throw new Error('Database connection not initialized')
  }

  return pool.getConnection()
}

export {
  createDatabaseConnection,
  getConnection
}