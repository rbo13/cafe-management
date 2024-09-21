import React, { useState } from 'react'
import Form from '../Form';
import { useRouter } from '@tanstack/react-router';

function AddForm({ onFormSubmit }) {
  const [initialValues, setInitialValues] = useState({})
  const router = useRouter()
  
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

  return (
    <>
      <Form
        title="Add New Cafe"
        fields={formFields}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />
    </>
  )
}

export default AddForm