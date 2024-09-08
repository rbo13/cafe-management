import * as Yup from 'yup'

const employeeValidationSchema = Yup.object().shape({
  name: Yup.string()
  .required('Name is required')
  .min(6, 'Minimum length is 6')
  .max(10, 'Maximum length is 10'),
  email_address: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone_number: Yup.string()
    .matches(/^[89]\d{7}$/, 'Invalid phone number')
    .required('Phone number is required'),
  gender: Yup.string().required('Gender is required')
})

export {
  employeeValidationSchema
}