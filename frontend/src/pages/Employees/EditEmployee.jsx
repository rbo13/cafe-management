import React from 'react'
import '../index.css'
import EditForm from '../../components/Employee/EditForm'
import { useUpdateEmployee } from '../../hooks/mutations/useUpdateEmployee'
import { Alert } from 'antd'

function EditEmployee() {

  const mutation = useUpdateEmployee()

  const handleSubmit = (data) => {
    if (data) {
      mutation.mutate({
        id: data.id,
        name: data.name,
        email_address: data.email_address,
        phone_number: data.phone_number
      })
    }
  }

  return (
    <div className='container'>
      {mutation?.isSuccess && <Alert message="Employee updated successfully!" type='success' showIcon closable/>}
      {mutation?.isError && <Alert message="Something went wrong, please try again" type='error' showIcon closable/>}
      <EditForm
        onFormSubmit={handleSubmit}
      />
    </div>
  )
}

export default EditEmployee