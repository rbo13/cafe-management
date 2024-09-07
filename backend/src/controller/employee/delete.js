import { deleteEmployeeService } from "../../service/employee"

function deleteEmployee() {
  return async (req, res) => {
    const employeeId = req.params.id
    try {
      await deleteEmployeeService(employeeId)
      return res.status(204).send('OK')
    } catch (error) {
      return res.status(404).json({
        message: error.message
      })
    }
  }
}

export {
  deleteEmployee
}