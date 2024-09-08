import React from 'react'
import '../index.css'
import { Alert } from 'antd'
import AddForm from '../../components/Employee/AddForm'
import { useAddEmployee } from '../../hooks/mutations/useAddEmployee'

function AddEmployee() {

  const mutation = useAddEmployee()

  const handleSubmit = (data) => {
    if (data) {
      mutation.mutate({
        employee_name: data.employee_name,
        email_address: data.email_address,
        phone_number: data.phone_number,
        gender: data.gender
      })
    }
  }
  
  return (
    <div className='container'>
      {mutation?.isError && <Alert message={`${mutation?.error?.message}`} type='error' showIcon closable/>}
      <AddForm
        onFormSubmit={handleSubmit}
      />
    </div>
  )
}

export default AddEmployee