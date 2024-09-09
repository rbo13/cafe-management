import React, { useMemo, useState } from 'react'
import Form from '../Form';
import { useRouter } from '@tanstack/react-router';
import { useCafes } from '../../hooks/useCafes';

function AddForm({ onFormSubmit }) {
  const [initialValues, setInitialValues] = useState({})
  const router = useRouter()

  const { data, error, isLoading } = useCafes()
  
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
        },
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: 'Invalid email address'
        }
      }
    },
    {
      name: 'phone_number',
      label: 'Phone Number',
      type: 'text',
      rules: {
        required: 'Phone number is required',
        pattern: {
          value: /^[89]\d{7}$/,
          message: 'Invalid Singapore phone number'
        }
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
      label: 'Assigned Cafe',
      type: 'select'
    },
  ]

  const handleFormSubmit = (data) => {
    onFormSubmit(data)
  }

  const handleCancel = () => {
    router.history.back()
  }

  const selectedOptions = useMemo(() => {
    if (data) {
      return data.map(cafe => ({
        value: cafe?.name,
        label: cafe?.name
      }))
    }
  }, [data])

  return (
    <>
      <Form
        title="Add New Employee"
        fields={formFields}
        initialValues={initialValues}
        selectOptions={selectedOptions}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />
    </>
  )
}

export default AddForm