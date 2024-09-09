import React, { useState } from 'react'
import Form from '../Form';
import { useRouter } from '@tanstack/react-router';

function AddForm({ onFormSubmit }) {
  const [initialValues, setInitialValues] = useState({})
  const router = useRouter()
  
  const formFields = [
    {
      name: 'employee_name',
      label: 'Employee Name',
      type: 'text',
      rules:{
        required: 'Employee Name is required',
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
      label: 'Employee Email',
      type: 'email',
      rules: {
        required: 'Email Address is required',
        maxLength: {
          value: 256,
          message: 'Maximum length is 256'
        }
      }
    },
    {
      name: 'phone_number',
      label: 'Phone Number',
      type: 'text',
      rules: {
        required: 'Phone number is required'
      }
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'radio',
      rules: {
        required: 'Gender is required'
      }
    },
    {
      name: 'cafe',
      label: 'Cafe to be assigned',
      type: 'text'
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
        title="Add New Employee"
        fields={formFields}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />
    </>
  )
}

export default AddForm