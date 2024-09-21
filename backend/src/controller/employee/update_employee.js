import { getCafeByName } from "../../service/cafe";
import { upsertService as employeeUpsertService, getEmployeeById } from "../../service/employee"
import { upsertService as employeeCafeUpsertService, getCafeEmployeeService } from "../../service/employee_cafe";

function updateEmployee() {
  return async (req, res) => {
    const {
      id,
      name,
      email_address,
      phone_number,
      cafe
    } = req.body

    const payload = {
      employee_name: name,
      email_address,
      phone_number
    }

    let currentEmployee;
    try {
      const [rows] = await getEmployeeById(id)
      if (rows?.length > 0) {
        currentEmployee = rows[0]
      } else {
        return res.status(404).json({
          message: "Employee not found, please create it",
          data: payload
        })
      }

      const updateEmployee = {
        ...payload,
        gender: currentEmployee?.gender
      }

      // change the cafe where
      // the current employee works
      if (cafe !== undefined) {
        const [currentCafe] = await getCafeByName(cafe)
        const [currentEmployeeCafe] = await getCafeEmployeeService({
          employeeId: currentEmployee?.id,
          cafeId: currentCafe[0]?.id
        })

        if (currentEmployeeCafe?.length > 0) {
          const employeeCafe = currentEmployeeCafe[0]
          await employeeCafeUpsertService({
            ...employeeCafe
          })
        } else {
          await employeeCafeUpsertService({
            employee_id: currentEmployee?.id,
            cafe_id: currentCafe[0]?.id
          })
        }
      }

      await employeeUpsertService(updateEmployee)

      return res.status(200).json({
        message: "Success",
        updateEmployee
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        data: null
      })
    }
  }
}

export { 
  updateEmployee
}