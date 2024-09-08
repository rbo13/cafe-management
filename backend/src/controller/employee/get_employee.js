import { getEmployeeByIdService, getService } from '../../service/employee'

function getEmployee() {
  return async (req, res) => {
    let cafe = req.query.cafe || null

    try {
      const [rows] = await getService(cafe)
      return res.status(200).json(rows)
    } catch (error) {
      return res.status(500).json({ message: 'Database query failed', error })
    }
  }
}

function getEmployeeById() {
  return async (req, res) => {
    const employeeId = req.params.id

    try {
      const [rows] = await getEmployeeByIdService(employeeId)
      if (rows.length > 0) {
        const employee = rows[0]
        return res.status(200).json(employee)
      }
      return res.status(404).json({ message: 'Employee not found' })
    } catch (error) {
      logger.error(`Error fetching employees: ${error.message}`)
      res.status(500).json({ message: 'Database query failed', error: error.message })
    }
  }
}

export {
  getEmployee,
  getEmployeeById
}