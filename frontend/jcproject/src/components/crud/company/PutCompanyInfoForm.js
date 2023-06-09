import FormikContol from '@/components/forms/FormikContol'
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetGenricChoiceQuery,
} from '@/store/features/choices'
import {
  useChangeCompanyInfoInfoMutation,
  useGetCompanyInfoByCompanyInfoIdQuery,
} from '@/store/features/companyInfoSlice'
import {
  convertImageUrlToFile,
  formDataToObject,
  objToFormData,
  objectToFormData,
} from '@/utils'
import { companyInfo, companyInfoSignUpSchema } from '@/utils/company'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PutCompanyInfoForm = ({ companyId }) => {
  const [changeCompanyInfoInfo, {}] = useChangeCompanyInfoInfoMutation()

  const router = useRouter()
  const [imageFile, setImageFile] = useState('')

  const {
    data: companyInfo,
    isLoading: isLoadingCompanyInfo,
    isSuccess: isSuccessCompanyInfo,
  } = useGetCompanyInfoByCompanyInfoIdQuery(+companyId ?? skipToken)

  const {
    data: citiesData,
    isLoading: citiesIsLoading,
    isSuccess: citiesIsSuccess,
  } = useGetCitiesQuery(companyInfo?.data.country ?? skipToken)

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
    imageFile == '' &&
      companyInfo?.data &&
      convertImageUrlToFile(companyInfo?.data.image).then((imagePayload) =>
        setImageFile(imagePayload),
      )
    return () => {}
  }, [
    companyInfo,
    sectorData,
    number_employersData,
    employer_typesData,
    heardData,
    imageFile,
    countriesData,
    citiesData,
  ])

  return isSuccessSector &&
    isSuccessNumber_employers &&
    isSuccessHeard &&
    isSuccessCompanyInfo &&
    isSuccessEmployer_type &&
    imageFile != '' &&
    isSuccessCountries &&
    citiesIsSuccess ? (
    !isLoadingSector &&
      !isLoadingNumber_employers &&
      !isLoadingCompanyInfo &&
      !isLoadingHeard &&
      !isLoadingEmployer_type &&
      !isLoadingCountries &&
      !citiesIsLoading && (
        <Formik
          initialValues={{
            ...companyInfo.data,
            image: imageFile,
            representative: companyInfo.data.representative.user.id,
            cityArr: citiesData.data,
          }}
          // validationSchema={companyInfoSignUpSchema}
          onSubmit={async (values, actions) => {
            try {
              const data = objectToFormData(values)
              await changeCompanyInfoInfo(data)
                .unwrap()
                .then((payload) => {
                  router.push('/dashboard/company-info/company/')
                })
                .catch((error) => {
                  console.log(error)
                })
            } catch (error) {}
          }}
        >
          {({ values }) => (
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
                label="Image:"
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

export default PutCompanyInfoForm
