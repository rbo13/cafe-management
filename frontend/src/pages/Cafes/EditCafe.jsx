import React from 'react'
import './index.css'
import EditForm from '../../components/Cafe/EditForm'
import { useUpdateCafe } from '../../hooks/mutations/useUpdateCafe'
import { Alert } from 'antd'

function EditCafe() {

  const mutation = useUpdateCafe()

  const handleSubmit = (data) => {
    if (data) {
      const formData = new FormData()
      formData.append('id', data.id)
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('location', data.location)
      formData.append('logo', data.logo)
      
      mutation.mutate(formData)
    }
  }

  return (
    <div className='container'>
      {mutation?.isSuccess && <Alert message="Cafe Updated successfully!" type='success' showIcon closable/>}
      {mutation?.isError && <Alert message="Something went wrong, please try again" type='error' showIcon closable/>}
      <EditForm
        onFormSubmit={handleSubmit}
      />
    </div>
  )
}

export default EditCafe