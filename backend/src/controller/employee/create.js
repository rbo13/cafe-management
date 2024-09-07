import { getCafeByName, upsertService } from "../../service/cafe"
import { createEmployeeService, getEmployeeByName, upsertService as upsertEmployeeService } from "../../service/employee"
import { createEmployeeCafeService } from "../../service/employee_cafe"

function createEmployee() {
  return async (req, res) => {
    const {
      employee_name,
      email_address,
      phone_number,
      gender,
      start_date,
      cafe
    } = req.body

    let newStartDate
    // in case we didn't specify
    // a start_date, use the current date
    if (start_date === undefined) {
      newStartDate = new Date().toISOString().split('T')[0]
    } else {
      newStartDate = start_date
    }

    const payload = {
      employee_name,
      email_address,
      phone_number,
      gender
    }

    let createdCafe;
    let createdEmployee;
    try {
      const [rows] = await getCafeByName(cafe?.name)
      if (rows.length > 0) {
        createdCafe = rows[0]
      } else {
        createdCafe = await upsertService({
          name: cafe?.name,
          location: cafe?.location
        })
      }

      const [employeeRows] = await getEmployeeByName(employee_name)
      if (employeeRows.length > 0) {
        createdEmployee = employeeRows[0]
      } else {
        createdEmployee = await createEmployeeService(payload)
      }

      const employeeCafePayload = {
        employee_id: createdEmployee?.id,
        cafe_id: createdCafe?.id,
        start_date: newStartDate
      }

      await createEmployeeCafeService(employeeCafePayload)
      
      return res.status(201).json({
        message: "Success",
        data: {
          createdCafe,
          createdEmployee
        }
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        data: payload
      })
    }
  }
}

export {
  createEmployee
}