import { deleteEmployeeService } from "../../service/employee"

function deleteEmployee() {
  return async (req, res) => {
    const employeeId = req.params.id
    try {
      await deleteEmployeeService(employeeId)
      return res.status(200).send({
        message: 'Employee deleted successfully!'
      })
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