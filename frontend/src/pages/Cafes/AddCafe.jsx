import React, { useState } from 'react'
import './index.css'
import AddForm from '../../components/Cafe/AddForm'
import { useAddCafe } from '../../hooks/mutations/useAddCafe'
import { Alert } from 'antd'

function AddCafe() {

  const [name, setName] = useState('')

  const mutation = useAddCafe()

  const handleSubmit = (data) => {
    if (data) {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('location', data.location)
      formData.append('logo', data.logo);

      mutation.mutate(formData)
      setName(data.name)
    }
  }
  
  return (
    <div className='container'>
      {mutation?.isSuccess && <Alert message={name && `${name} has been added successfully`} type='success' showIcon closable/>}
      {mutation?.isError && <Alert message='Something went wrong, please try again' type='error' showIcon closable/>}
      <AddForm
        onFormSubmit={handleSubmit}
      />
    </div>
  )
}

export default AddCafe