import React, { useEffect, useState } from 'react'
import Form from '../Form'
import { Alert, Spin } from 'antd'
import { useRouter } from '@tanstack/react-router'
import { Route as EditEmployeeRoute } from '../../routes/employees/$employeeId.edit'
import { useEmployee } from '../../hooks/useEmployees'

function EditForm({ onFormSubmit }) {
  const { employeeId } = EditEmployeeRoute.useParams()
  const router = useRouter()

  const [initialValues, setInitialValues] = useState({})
  const { data, error, isLoading } = useEmployee(employeeId)

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
    onFormSubmit(data)
  }

  const handleCancel = () => {
    router.history.back()
  }

  useEffect(() => {
    if (data) {
      setInitialValues(data)
    }
  }, [data])

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size='large' />
      </div>
    )
  }

  if (error) {
    return <Alert message="Error" description="Failed to load employee data." type="error" showIcon />
  }

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