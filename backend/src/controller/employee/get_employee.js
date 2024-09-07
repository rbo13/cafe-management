import { getService } from '../../service/employee'

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

export {
  getEmployee
}