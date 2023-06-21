import * as Yup from 'yup'
export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const userPassworrdReset = {
  uidb64: '',
  token: '',
  passwordOne: '',
  passwordTwo: '',
}
export const user = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  first_name: '',
  last_name: '',
  middle_name: '',
  gender: 'M',
  user_type: '',
  phone_number: '',
  redirect_url: '',
}

export const userSignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required field'),
  passwordOne: Yup.string().required('Password is required'),
  passwordTwo: Yup.string()
    .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match')
    .required('Comfirm Password is required'),
  first_name: Yup.string().required('Required field'),
  last_name: Yup.string().required('Required field'),
  middle_name: Yup.string().required('Required field'),
  // phone_number: Yup.string().required("Required field").matches(phoneRegExp, "Phone number is not valid"),
  phone_number: Yup.string().required('Required field'),
})

export const userPassworrdResetSignUpSchema = Yup.object().shape({
  passwordOne: userSignUpSchema.clone().fields.passwordOne,
  passwordTwo: userSignUpSchema.clone().fields.passwordTwo,
})

