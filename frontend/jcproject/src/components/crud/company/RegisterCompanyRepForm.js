import FormikContol from '@/components/forms/FormikContol'
import { useGetGenricChoiceQuery } from '@/store/features/choices'
import { useRegisterNewUserMutation } from '@/store/features/authSlice'
import { useAddNewCompanyRepMutation } from '@/store/features/companyRepSlice'
import { companyRep, companyRepSignUpSchema } from '@/utils/company'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const RegisterCompanyRepForm = () => {
  const [webUrl, setWebUrl] = useState('')
  const router = useRouter()
  const [
    registerNewUser,
    { isLoading, data: userData, error: myError },
  ] = useRegisterNewUserMutation()
  const [addNewCompanyRep, {}] = useAddNewCompanyRepMutation()
  const {
    data: positionData,
    isLoading: isLoadingPosition,
    isSuccess: isSuccessPosition,
  } = useGetGenricChoiceQuery('position')

  const {
    data: sexData,
    isLoading: isLoadingSex,
    isSuccess: isSuccessSex,
  } = useGetGenricChoiceQuery('sex')
  useEffect(() => {
    setWebUrl(`${window.location.origin}/account/verification/`)
    return () => {}
  }, [positionData, sexData])

  return isSuccessPosition && isSuccessSex ? (
    <Formik
      initialValues={companyRep}
      validationSchema={companyRepSignUpSchema}
      onSubmit={async (values, actions) => {
        const { user, position } = values
        try {
          const {
            email,
            passwordOne,
            first_name,
            last_name,
            middle_name,
            gender,
            phone_number,
          } = user
          await registerNewUser({
            email,
            password: passwordOne,
            first_name,
            last_name,
            middle_name,
            gender,
            phone_number,
            user_type: 'company-rep',
            redirect_url: webUrl,
          })
            .unwrap()
            .then((payload) =>
              addNewCompanyRep({
                user: {
                  id: payload.data.user_id,
                  email,
                  first_name,
                  last_name,
                  middle_name,
                  gender,
                  phone_number,
                },
                position,
              })
                .unwrap()
                .then((repPayload) => {
                  actions.resetForm({ values: '' })
                  router.push('/account/log-in')
                })
                .finally(),
            )
            .catch((error) => console.log(error))
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
            name="user.email"
            label="Email:"
            className="email"
          />
          <FormikContol
            control="input"
            name="user.first_name"
            className="first_name"
            type="text"
            label="First name:"
            placeholder="John"
          />
          <FormikContol
            control="input"
            name="user.last_name"
            className="last_name"
            type="text"
            label="Last name:"
            placeholder="Doe"
          />
          <FormikContol
            control="input"
            name="user.middle_name"
            className="middle_name"
            type="text"
            label="Middle name:"
            placeholder="Yaw"
          />
          <FormikContol
            control="input"
            name="user.passwordOne"
            className="passwordOne"
            type="password"
            label="Password:"
            placeholder=""
          />
          <FormikContol
            control="input"
            name="user.passwordTwo"
            className="passwordTwo"
            type="password"
            label="Confirm password:"
            placeholder=""
          />
          <FormikContol
            control="select"
            name="user.gender"
            className="gender"
            label="Gender:"
            placeholder="Gender"
            options={sexData.data}
          />
          <FormikContol
            control="input"
            name="user.phone_number"
            className="phone_number"
            type="tel"
            label="Phone number:"
            placeholder="+233454646458"
          />
          <FormikContol
            control="select"
            name="position"
            className="position"
            label="Position:"
            options={positionData.data}
          />
          <button type="submit" className="companyRep_btn btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  ) : (
    <div>Loading...</div>
  )
}

export default RegisterCompanyRepForm
