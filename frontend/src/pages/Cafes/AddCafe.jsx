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
      mutation.mutate({
        name: data.name,
        description: data.description,
        location: data.location
      })
      setName(data.name)
    }
  }
  
  return (
    <div className='container'>
      {mutation?.isSuccess && <Alert message={name && `${name} has been added successfully`} type='success' showIcon closable/>}
      <AddForm
        onFormSubmit={handleSubmit}
      />
    </div>
  )
}

export default AddCafe