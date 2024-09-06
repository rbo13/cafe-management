import express from 'express'

function cafeRoutes() {
  const router = express.Router()

  router.get('/', index)

  return router
}

async function index(req, res) {
  return res.json({ message: "Hello, world!" })
}


export { cafeRoutes }