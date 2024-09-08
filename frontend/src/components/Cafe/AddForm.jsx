import React, { useState } from 'react'
import Form from '../Form';

function AddForm() {
  const [initialValues, setInitialValues] = useState({})

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
    { name: 'logo', label: 'Logo', type: 'file' },
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
    console.log("Data passed", data)
  }

  const handleCancel = () => {
    console.log('Cancelling')
  }

  return (
    <>
      <Form
        title="Add new cafe"
        fields={formFields}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />
    </>
  )
}

export default AddForm