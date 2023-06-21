import FormikContol from '@/components/forms/FormikContol'
import { useRegisterNewUserMutation } from '@/store/features/authSlice'
import {
  useAddNewJobSeekerMutation,
  useMutateJobSeekerInfoMutation,
} from '@/store/features/jobSeekerSlice'
import { useAddNewSectorMutation } from '@/store/features/sectorSlice'
import {
  jobSeekerInitials,
  jobSeekerSignUpSchema,
  makeUnique,
} from '@/utils/jobSeeker'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import {
  useGetGenricChoiceQuery,
  useGetNationalityQuery,
} from '@/store/features/choices'

const RegisterJobSeekerForm = () => {
  const [webUrl, setWebUrl] = useState('')
  const [jobSector_sector, setJobSector_sector] = useState('')
  const sectorRef = useRef(null)
  const router = useRouter()

  const [registerNewUser, {}] = useRegisterNewUserMutation()
  const [isUserData, setIsUserData] = useState(true)
  const [addNewJobSeeker, {}] = useAddNewJobSeekerMutation()


  const {
    data: sexData,
    isLoading: isLoadingSex,
    isSuccess: isSuccessSex,
  } = useGetGenricChoiceQuery('sex')
  const {
    data: qualicationData,
    isLoading: isLoadingQualication,
    isSuccess: isSuccessQualication,
  } = useGetGenricChoiceQuery('qualication')
  const {
    data: nationalityData,
    isLoading: isLoadingNationality,
    isSuccess: isSuccessNationality,
  } = useGetNationalityQuery()
  const {
    data: sectorData,
    isLoading: isLoadingSector,
    isSuccess: isSuccessSector,
  } = useGetGenricChoiceQuery('sector')

  useEffect(() => {
    setWebUrl(`${window.location.origin}/account/verification/`)
    return () => {}
  }, [sexData, qualicationData, sectorData, nationalityData])

  return isSuccessSex &&
    isSuccessQualication &&
    isSuccessSector &&
    isSuccessNationality ? (
    !isLoadingSex &&
      !isLoadingQualication &&
      !isLoadingSector &&
      !isLoadingNationality &&
      webUrl != '' && (
        <Formik
          enableReinitialize={true}
          initialValues={{
            ...jobSeekerInitials,
            cityArr: [
              {
                key: '',
                value: '---------select a nationality---------',
              },
            ],
          }}
          // validationSchema={jobSeekerSignUpSchema}
          onSubmit={async (values, actions) => {
            const {
              user,
              date_of_birth,
              nationality,
              city,
              location,
              high_qualification,
              years_of_experience,
              available,
              job_sector,
            } = values
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
                redirect_url: webUrl,
                user_type: 'seeker',
              })
                .unwrap()
                .then((payload) => {
                  addNewJobSeeker({
                    user: {
                      id: payload.data.user_id,
                      email,
                      first_name,
                      last_name,
                      middle_name,
                      gender,
                      phone_number,
                    },
                    date_of_birth,
                    nationality,
                    location,
                    city,
                    high_qualification,
                    years_of_experience,
                    available,
                    job_sector,
                  })
                    .unwrap()
                    .then((jobPayload) => {
                      console.log(jobPayload)
                      router.push('/account/log-in')
                    })
                    .catch((error) => console.log(error))
                })
            } catch (error) {
              console.log(error)
            }
          }}
        >
          {({ values, setFieldValue }) => {
            return (
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
                  control="input"
                  name="date_of_birth"
                  className="date_of_birth"
                  type="date"
                  label="Date of birth:"
                  placeholder=""
                />
                <FormikContol
                  control="select"
                  name="nationality"
                  className="nationality"
                  label="Nationality:"
                  options={nationalityData.data}
                />
                <FormikContol
                  control="select"
                  name="city"
                  className="city"
                  // disabled={true}
                  label="City:"
                  options={values.cityArr}
                />
                <FormikContol
                  control="select"
                  name="high_qualification"
                  label="Qualification:"
                  className="high_qualification"
                  options={qualicationData.data}
                />
                <FormikContol
                  control="input"
                  name="years_of_experience"
                  className="years_of_experience"
                  type="number"
                  label="Experience:"
                />
                <div>
                  <label htmlFor="available">Available: </label>
                  <Field type="checkbox" name="available" id="available" />
                </div>
                <div className="select-container">
                  <label htmlFor="job_sector" className="job_sector">
                    Which sectors do you want to work in?
                  </label>
                  <FieldArray name="job_sector">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.job_sector.length > 0 &&
                          values.job_sector.map((sector, index) => (
                            <div key={index} className="select-input-container">
                              {sector.sector != '' && (
                                <>
                                  <div className="display-container">
                                    {sectorData.data.map(
                                      (item, index) =>
                                        item.key == sector.sector && (
                                          <p key={index}>{item.value}</p>
                                        ),
                                    )}
                                  </div>
                                  {values.job_sector.length >= 2 && (
                                    <div
                                      type="button"
                                      className="btn btn-outline-danger"
                                      onClick={() => remove(index)}
                                    >
                                      x
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                        <div>
                          <div className={'input-container'}>
                            <label htmlFor={'job_sector_sector'}>Sector:</label>
                            <select
                              className={`job_sector_sector`}
                              id={`job_sector_sector`}
                              ref={sectorRef}
                              onChange={(e) =>
                                setJobSector_sector(e.target.value)
                              }
                            >
                              {sectorData.data.map(({ key, value }, index) => (
                                <option key={index} value={key}>
                                  {value}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div
                            type="button "
                            className="btn btn-outline-success"
                            onClick={() => {
                              let { job_sector } = values
                              job_sector.forEach((sector) => {
                                if (sector?.sector == sectorRef.current.value)
                                  sectorRef.current.value = ''
                              })
                              if (sectorRef.current.value != '')
                                push({
                                  seeker: null,
                                  sector: sectorRef.current.value,
                                })
                              sectorRef.current.value = ''
                            }}
                          >
                            Add Sector
                          </div>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <button
                  type="submit"
                  className="job-seeker_btn btn btn-primary"
                >
                  Submit
                </button>
              </Form>
            )
          }}
        </Formik>
      )
  ) : (
    <div>Loading...</div>
  )
}

export default RegisterJobSeekerForm
