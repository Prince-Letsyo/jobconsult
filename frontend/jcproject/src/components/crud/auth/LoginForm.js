import FormikContol from '@/components/forms/FormikContol'
import { useLoginUserMutation } from '@/store/features/authSlice'
import {
  selectCurrentUser_id,
  selectCurrentUser_type,
  setCredentials,
} from '@/store/features/authSlice/jwtAuthSlice'
import { userSignUpSchema } from '@/utils/user'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

const localkey = 'CONSULT_KEY'

const logInSchema = Yup.object().shape({
  email: userSignUpSchema.clone().fields.email,
  password: userSignUpSchema.clone().fields.passwordOne,
})
const LoginForm = () => {
  const [
    loginUser,
    { isLoading, data, error: myError },
  ] = useLoginUserMutation()
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {}
  }, [data, myError])

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={logInSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await loginUser(values)
            .unwrap()
            .then((payload) => {
              dispatch(setCredentials({ ...payload.data }))
              localStorage.setItem(localkey, payload.data.tokens.refresh)
              resetForm({ values: '' })
              const { user_type } = payload.data
              if (user_type == 'company-rep')
                router.push(`/dashboard/company-info/rep/`)
              else if (user_type == 'seeker')
                router.push(`/dashboard/jobseeker/`)
              else {
              }
            })
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ values }) => (
        <Form className="generic-form">
          <FormikContol
            control="input"
            type="email"
            placeholder="example@gmail.com"
            id="email"
            name="email"
            label="Email:"
            className="email"
          />
          <FormikContol
            control="input"
            type="password"
            placeholder="Password"
            id="password"
            className="password"
            name="password"
            label="Password:"
          />
          <button type="submit" className="login_user_btn btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
