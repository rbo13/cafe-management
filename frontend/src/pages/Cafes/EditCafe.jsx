import React from 'react'
import './index.css'
import EditForm from '../../components/Cafe/EditForm'
import { useUpdateCafe } from '../../hooks/useUpdateCafe'
import { Alert } from 'antd'

function EditCafe() {

  const mutation = useUpdateCafe()

  const handleSubmit = (data) => {
    if (data) {
      mutation.mutate({
        id: data?.id,
        name: data?.name,
        description: data?.description,
        location: data?.location
      })
    }
  }

  return (
    <div className='container'>
      {mutation?.isSuccess && <Alert message="Cafe Updated successfully!" type='success' showIcon closable/>}
      <EditForm
        onFormSubmit={handleSubmit}
      />
    </div>
  )
}

export default EditCafe