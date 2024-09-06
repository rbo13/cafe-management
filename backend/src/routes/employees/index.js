import express from 'express'

function employeeRoutes() {
  const router = express.Router()

  router.get('/', index)

  return router
}

async function index(req, res) {
  return res.json({ message: "Hello, world!" })
}


export { employeeRoutes }