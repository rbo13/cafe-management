import React, { useEffect, useState } from 'react'
import Form from '../Form'
import { Alert, Spin } from 'antd'
import { useRouter } from '@tanstack/react-router'
import { Route as EditEmployeeRoute } from '../../routes/employees/$employeeId.edit'

function EditForm() {
  const { employeeId } = EditEmployeeRoute.useParams()
  const router = useRouter()

  const [initialValues, setInitialValues] = useState({})
  // const { data, error, isLoading } = useCafe(employeeId)

  // useEffect(() => {
  //   if (data) {
  //     setInitialValues(data)
  //   }
  // }, [data])

  const formFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      rules:{
        required: 'Name is required',
        minLength: {
          value: 6,
          message: 'Minimum length is 6'
        },
        maxLength: {
          value: 10,
          message: 'Maximum length is 10'
        }
      }
    },
    {
      name: 'email_address',
      label: 'Email Address',
      type: 'textarea',
      rules: {
        maxLength: {
          value: 256,
          message: 'Maximum length is 256'
        }
      }
    },
    { name: 'phone_number', label: 'Logo', type: 'file' }
  ]

  const handleFormSubmit = (data) => {
    console.log("Data passed", data)
  }

  const handleCancel = () => {
    router.history.back()
  }

  // if (isLoading) {
  //   return (
  //     <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  //       <Spin size='large' />
  //     </div>
  //   )
  // }

  // if (error) {
  //   return <Alert message="Error" description="Failed to load cafe data." type="error" showIcon />
  // }

  return (
    <>
      <Form
        title='Edit Employee'
        fields={formFields}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />
    </>
  )
}

export default EditForm