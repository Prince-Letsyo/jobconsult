import FormContainer from '@/components/forms/FormContainer'
import FormikContol from '@/components/forms/FormikContol'
import {
  usePasswordResetCompleteMutation,
  usePasswordResetMutation,
} from '@/store/features/authSlice'
import {
  userPassworrdReset,
  userPassworrdResetSignUpSchema,
} from '@/utils/user'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const PasswordResetComplete = () => {
  const router = useRouter()
  const { uidb64, token } = router.query
  const {
    data: passwordResetData,
    isError: isErrorPasswordReset,
    isSuccess: isSuccessPasswordReset,
  } = usePasswordResetMutation({
    token: token ?? skipToken,
    uidb64: uidb64 ?? skipToken,
  })

  const [passwordResetComplete, {}] = usePasswordResetCompleteMutation()

  useEffect(() => {
    return () => {}
  }, [passwordResetData])
  return (
    <div>
      {!isErrorPasswordReset &&
      passwordResetData.data &&
      passwordResetData.data?.success ? (
        <FormContainer title={'Passwod Reset'} tale={''} href={''}>
          {isSuccessPasswordReset ? (
            <Formik
              initialValues={{
                ...userPassworrdReset,
                uidb64: passwordResetData.data.uidb64,
                token: passwordResetData.data.token,
              }}
              validationSchema={userPassworrdResetSignUpSchema}
              onSubmit={async (values, { resetForm }) => {
                const { uidb64, token, passwordOne } = values

                try {
                  passwordResetComplete({
                    uidb64,
                    token,
                    password: passwordOne,
                  }).unwrap()
                  resetForm({ values: '' })
                  router.push('/account/log-in/')
                } catch (error) {}
              }}
            >
              {({ values }) => (
                <Form className="generic-form">
                  <FormikContol
                    control="input"
                    name="passwordOne"
                    className="passwordOne"
                    type="password"
                    label="Password:"
                    placeholder=""
                  />
                  <FormikContol
                    control="input"
                    name="passwordTwo"
                    className="passwordTwo"
                    type="password"
                    label="Confirm password:"
                    placeholder=""
                  />
                  <button
                    type="submit"
                    className="job-seeker_btn btn btn-primary"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </FormContainer>
      ) : (
        <div>
          Credentials has expireed or tempted with. Click
          <Link href={'/account/reset_password/'}>Link</Link> to request
          passworrd.
        </div>
      )}
    </div>
  )
}

export default PasswordResetComplete
