import { companyInfo } from '@/utils/company'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import FormikContol from '@/components/forms/FormikContol'
import { useEffect } from 'react'
import { objectToFormData } from '@/utils'
import {
  useGetCountriesQuery,
  useGetGenricChoiceQuery,
} from '@/store/features/choices'
import { useSelector } from 'react-redux'
import { selectCurrentUser_id } from '@/store/features/authSlice/jwtAuthSlice'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useGetCompanyRepByCompanyRepIdQuery } from '@/store/features/companyRepSlice'
import { useAddNewCompanyInfoMutation } from '@/store/features/companyInfoSlice'

const RegisterCompanyInfoForm = () => {
  const router = useRouter()
  const user_id = useSelector(selectCurrentUser_id)
  const {
    data: repData,
    isSuccess: isSuccessRep,
    isLoading: isLoadingRep,
  } = useGetCompanyRepByCompanyRepIdQuery(user_id ?? skipToken)
  const [addNewCompanyInfo, {}] = useAddNewCompanyInfoMutation()
  const {
    data: countriesData,
    isLoading: isLoadingCountries,
    isSuccess: isSuccessCountries,
  } = useGetCountriesQuery()
  const {
    data: sectorData,
    isLoading: isLoadingSector,
    isSuccess: isSuccessSector,
  } = useGetGenricChoiceQuery('sector')

  const {
    data: number_employersData,
    isLoading: isLoadingNumber_employers,
    isSuccess: isSuccessNumber_employers,
  } = useGetGenricChoiceQuery('number_employers')
  const {
    data: employer_typesData,
    isLoading: isLoadingEmployer_type,
    isSuccess: isSuccessEmployer_type,
  } = useGetGenricChoiceQuery('employer_type')
  const {
    data: heardData,
    isLoading: isLoadingHeard,
    isSuccess: isSuccessHeard,
  } = useGetGenricChoiceQuery('heard')

  useEffect(() => {
    return () => {}
  }, [
    sectorData,
    number_employersData,
    employer_typesData,
    heardData,
    countriesData,
    repData,
  ])
  return isSuccessSector &&
    isSuccessNumber_employers &&
    isSuccessHeard &&
    isSuccessEmployer_type &&
    isSuccessCountries &&
    isSuccessRep ? (
    !isLoadingSector &&
      !isLoadingNumber_employers &&
      !isLoadingHeard &&
      !isLoadingEmployer_type &&
      !isLoadingCountries &&
      !isLoadingRep && (
        <Formik
          initialValues={{
            ...companyInfo,
            representative: { user: repData.data.user },
            cityArr: [
              {
                key: '',
                value: '---------select a nationality---------',
              },
            ],
          }}
          // validationSchema={companyInfoSignUpSchema}
          onSubmit={async (values, actions) => {
            try {
              const {
                representative,
                company_name,
                industry,
                number_of_employees,
                type_of_employer,
                hear_about,
                website,
                contact_person,
                company_email,
                company_phone_number,
                country,
                city,
                address,
                image,
              } = values
              console.log(values)
              const data = objectToFormData({
                representative,
                company_name,
                industry,
                number_of_employees,
                type_of_employer,
                hear_about,
                website,
                contact_person,
                company_email,
                company_phone_number,
                country,
                city,
                address,
                image,
              })
              await addNewCompanyInfo(data)
                .unwrap()
                .then((payload) => console.log(payload))
            } catch (error) {
              console.log(error)
            }
          }}
        >
          {({ values, isValid }) => (
            <Form className="generic-form">
              <FormikContol
                control="input"
                type="text"
                placeholder="Company name"
                name="company_name"
                label="Company name:"
                className="company_name"
              />
              <FormikContol
                control="select"
                name="country"
                className="country"
                label="Country:"
                options={countriesData.data}
              />
              <FormikContol
                control="select"
                name="city"
                className="city"
                label="City:"
                options={values.cityArr}
              />
              <FormikContol
                control="select"
                name="industry"
                label="Industry:"
                className="industry"
                options={sectorData.data}
              />
              <FormikContol
                control="select"
                name="number_of_employees"
                label="Number of employees:"
                className="number_of_employees"
                options={number_employersData.data}
              />
              <FormikContol
                control="select"
                name="type_of_employer"
                label="Type of employer:"
                className="type_of_employer"
                options={employer_typesData.data}
              />
              <FormikContol
                control="select"
                name="hear_about"
                label="Heard about us:"
                className="hear_about"
                options={heardData.data}
              />
              <FormikContol
                control="input"
                type="text"
                placeholder="https//www.example.com"
                name="website"
                label="Website:"
                className="website"
              />
              <FormikContol
                control="input"
                type="text"
                placeholder="eg. John Doe"
                name="contact_person"
                label="Contact person:"
                className="contact_person"
              />
              <FormikContol
                control="input"
                type="email"
                placeholder="https//www.companyexample.com"
                name="company_email"
                label="Contact email:"
                className="company_email"
              />
              <FormikContol
                control="input"
                type="tel"
                placeholder="eg. +2337657675675"
                name="company_phone_number"
                label="Company phone number:"
                className="company_phone_number"
              />
              <FormikContol
                control="textarea"
                name="address"
                label="Address:"
                className="address"
              />
              <FormikContol
                control="file"
                name="image"
                label="Company image :"
                className="image"
              />
              <button
                type="submit"
                className="company_info_btn btn btn-primary"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )
  ) : (
    <div>Loading...</div>
  )
}

export default RegisterCompanyInfoForm
