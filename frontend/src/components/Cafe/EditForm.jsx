import React, { useEffect, useState } from 'react'
import Form from '../Form'
import { Alert, Spin } from 'antd'
import { Route as EditCafeRoute } from '../../routes/cafes/$cafeId.edit'
import { useCafe } from '../../hooks/useCafes'
import { useRouter } from '@tanstack/react-router'

function EditForm({ onFormSubmit }) {
  const { cafeId } = EditCafeRoute.useParams()
  const router = useRouter()

  const [initialValues, setInitialValues] = useState({})
  const { data, error, isLoading } = useCafe(cafeId)

  useEffect(() => {
    if (data) {
      setInitialValues(data)
    }
  }, [data])

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
      name: 'description',
      label: 'Description',
      type: 'textarea',
      rules: {
        maxLength: {
          value: 256,
          message: 'Maximum length is 256'
        }
      }
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'file'
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      rules: {
        required: 'Location is required'
      }
    },
  ]

  const handleFormSubmit = (data) => {
    onFormSubmit(data)
  }

  const handleCancel = () => {
    router.history.back()
  }

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size='large' />
      </div>
    )
  }

  if (error) {
    return <Alert message="Error" description="Failed to load cafe data." type="error" showIcon />
  }

  return (
    <>
      <Form
        title='Edit cafe'
        fields={formFields}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />
    </>
  )
}

export default EditForm