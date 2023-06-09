import FormikContol from '@/components/forms/FormikContol'
import { useRequestPasswordResetMutation } from '@/store/features/authSlice'
import { userSignUpSchema } from '@/utils/user'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'

const requestPasswordResetSchema = Yup.object().shape({
  email: userSignUpSchema.clone().fields.email,
})

const RequestPasswordResetForm = () => {
  const [webUrl, setWebUrl] = useState('')

  const [
    requestPasswordReset,
    { isLoading, data, error: myError },
  ] = useRequestPasswordResetMutation()
  const router = useRouter()

  useEffect(() => {
    setWebUrl(`${window.location.origin}/account/password_reset_complete/`)
    return () => {}
  }, [myError])

  return (
    <Formik
      initialValues={{
        email: '',
        redirect_url: webUrl,
      }}
      validationSchema={requestPasswordResetSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await requestPasswordReset(values).unwrap()
          resetForm({ values: '' })
        } catch (error) {}
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
          <button type="submit" className="login_user_btn btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default RequestPasswordResetForm
