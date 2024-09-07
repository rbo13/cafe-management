import logger from 'loglevel'
import { randomInt } from "node:crypto"

function createCafe(db) {
  return async (req, res) => {
    const {
      name,
      location
    } = req.body

    const id = generateCafeId(8)
    
    return res.status(201).json({ message: "Cafe Created Successfully!", data: { id, name, location } })
  }
}

function generateCafeId(size) {
  const prefix = 'UI'
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = prefix

  for (let i = 0; i < size; i++) {
    const randomIndex = randomInt(0, characters.length);
    id += characters[randomIndex];
  }

  return id
}

export { createCafe }