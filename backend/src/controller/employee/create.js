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

    const payload = {
      employee_name,
      email_address,
      phone_number,
      gender
    }

    let createdCafe;
    let createdEmployee;
    try {
      createdEmployee = await createEmployeeService(payload)
    
      if (cafe !== undefined) {
        const [rows] = await getCafeByName(cafe?.name)
        if (rows.length > 0) {
          createdCafe = rows[0]
        } else {
          createdCafe = await upsertService({
            name: cafe?.name,
            location: cafe?.location
          })
        }

        const employeeCafePayload = {
          employee_id: createdEmployee?.id,
          cafe_id: createdCafe?.id ? createdCafe?.id : 0,
          start_date
        }
        await createEmployeeCafeService(employeeCafePayload)
      }

      return res.status(201).json({
        message: "Success",
        data: {
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