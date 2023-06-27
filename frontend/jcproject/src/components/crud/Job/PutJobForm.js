import FormikContol from '@/components/forms/FormikContol'
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetGenricChoiceQuery,
} from '@/store/features/choices'
import { useDeleteJobRequirementInfoMutation } from '@/store/features/jobRequirementsSlice'
import { useDeleteJobResponsibilityInfoMutation } from '@/store/features/jobResponsibilitiesSlice'
import {
  useChangeJobInfoMutation,
} from '@/store/features/jobsSlice'
import { convertImageUrlToFile, objectToFormData } from '@/utils'
import { format } from 'date-fns'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

const PutJobForm = ({ jobData: { user, job } }) => {
  const router = useRouter()
  const [imageFile, setImageFile] = useState('')

  const [
    changeJobInfo,
    { isLoading: isLoadingChangeJobInfo, data: dataChangeJobInfo },
  ] = useChangeJobInfoMutation()

  const [deleteRequirements, setDeleteRequirements] = useState([])
  const [deleteResponsibilities, setDeleteResponsibilities] = useState([])

  const [deleteJobRequirementInfo,{}]=useDeleteJobRequirementInfoMutation()
  const [deleteJobResponsibilityInfo,{}]=useDeleteJobResponsibilityInfoMutation()

  const {
    data: citiesData,
    isLoading: citiesIsLoading,
    isSuccess: citiesIsSuccess,
  } = useGetCitiesQuery(job.country ?? skipToken)

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
    data: jobTypeData,
    isLoading: isLoadingJobType,
    isSuccess: isSuccessJobType,
  } = useGetGenricChoiceQuery('type_of_job')

  const {
    data: qualicationData,
    isLoading: isLoadingQualication,
    isSuccess: isSuccessQualication,
  } = useGetGenricChoiceQuery('qualication')
  const {
    data: typeEmploymentData,
    isLoading: isLoadingTypeEmployment,
    isSuccess: isSuccessTypeEmployment,
  } = useGetGenricChoiceQuery('type_employment')

  useEffect(() => {
    imageFile == '' &&
      convertImageUrlToFile(job.image).then((imagePayload) =>
        setImageFile(imagePayload),
      )
    return () => {}
  }, [
    sectorData,
    jobTypeData,
    qualicationData,
    typeEmploymentData,
    imageFile,
    countriesData,
    citiesData,
  ])

  return !isLoadingSector &&
    !isLoadingQualication &&
    !isLoadingJobType &&
    !isLoadingTypeEmployment &&
    typeof imageFile != 'string' &&
    !isLoadingCountries &&
    !citiesIsLoading ? (
    isSuccessSector &&
      isSuccessJobType &&
      isSuccessQualication &&
      isSuccessTypeEmployment &&
      isSuccessCountries &&
      citiesIsSuccess && (
        <Formik
          initialValues={{
            id: job.id,
            title: job.title,
            country: job.country,
            city: job.city,
            description: job.description,
            sector: job.sector,
            type_of_job: job.type_of_job,
            deadline: format(new Date(job.deadline), 'yyyy-MM-dd HH:mm'),
            minimum_qualification: job.minimum_qualification,
            type_of_employment: job.type_of_employment,
            experience_length: job.experience_length,
            number_of_required_applicantion:
              job.number_of_required_applicantion,
            responsibilities: job.responsibilities,
            requirements: job.requirements,
            publisher: job.publisher,
            image: imageFile,
            cityArr: citiesData.data,
          }}
          // validationSchema={jobRegisterSchema}
          onSubmit={async (values, actions) => {
            try {
              const {
                id,
                title,
                country,
                city,
                description,
                sector,
                type_of_job,
                deadline,
                minimum_qualification,
                type_of_employment,
                experience_length,
                number_of_required_applicantion,
                requirements,
                responsibilities,
                publisher,
                image,
              } = values
              const data = objectToFormData({
                id,
                title,
                country,
                city,
                description,
                sector,
                type_of_job,
                deadline,
                minimum_qualification,
                type_of_employment,
                experience_length,
                number_of_required_applicantion,
                requirements,
                responsibilities,
                publisher,
                image,
              })
              await changeJobInfo(data)
              .unwrap()
                .then((payload) => {
                  deleteResponsibilities.every((assign) => {
                    if (assign?.id !== undefined)
                      return deleteJobResponsibilityInfo(assign.id)
                  })
                  deleteRequirements.every((requires) => {
                    if (requires?.id !== undefined)
                      return deleteJobRequirementInfo(requires.id)
                  })
                  console.log(payload)
                })
                .catch((error) => console.log(error))
            } catch (error) {}
          }}
        >
          {({ values }) => (
            <Form className="generic-form">
              <FormikContol
                control="input"
                type="text"
                placeholder="Job title"
                name="title"
                label="Job title:"
                className="job-title"
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
                control="textarea"
                name="description"
                label="Description:"
                className="description"
              />

              <FormikContol
                control="select"
                id="sector-select"
                label="Sector:"
                className="sector-job"
                name={`sector`}
                options={sectorData.data}
              />
              <FormikContol
                control="select"
                id="type_of_job"
                label="Job function:"
                className="type_of_job"
                name={`type_of_job`}
                options={jobTypeData.data}
              />
              <FormikContol
                control="select"
                id="minimum_qualification"
                label="Minimum qualification:"
                className="minimum_qualification"
                name={`minimum_qualification`}
                options={qualicationData.data}
              />
              <FormikContol
                control="select"
                id="type_of_employment"
                label="Type of employment:"
                className="type_of_employment"
                name={`type_of_employment`}
                options={typeEmploymentData.data}
              />

              <FormikContol
                control="input"
                type="number"
                name="experience_length"
                label="Year(s) of Experience :"
                className="experience_length"
              />
              <FormikContol
                control="input"
                type="number"
                name="number_of_required_applicantion"
                label="Number of required Applicant:"
                className="number_of_required_applicantion"
              />
              <div>
                <label htmlFor="responsibility-list">Responsibilities</label>
                <FieldArray name="responsibilities" id="responsibility-list">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.responsibilities.length > 0 &&
                        values.responsibilities.map((sector, index) => (
                          <div key={index}>
                            <div>
                              <label htmlFor="responsibilities-select">
                                Job applicant would be responsible for:
                              </label>
                              <Field
                                id="responsibilities-select"
                                className="responsibilities-select"
                                name={`responsibilities.${index}.assign`}
                              />
                            </div>
                            {values.responsibilities.length >= 1 && (
                              <div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeleteResponsibilities((preState) => [
                                      ...preState,
                                      values.responsibilities[index],
                                    ])
                                    remove(index)
                                  }}
                                >
                                  remove
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => push({ job: values.id, assign: '' })}
                      >
                        Add Friend
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div>
                <label htmlFor="requirement-list">Requirements</label>
                <FieldArray name="requirements" id="responsibility-list">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.requirements.length > 0 &&
                        values.requirements.map((sector, index) => (
                          <div key={index}>
                            <div>
                              <label htmlFor="requirements-select">
                                Job applicant would be required to :
                              </label>
                              <Field
                                id="requirements-select"
                                className="requirements-select"
                                name={`requirements.${index}.requires`}
                              />
                            </div>
                            {values.requirements.length >= 1 && (
                              <div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeleteRequirements((preState) => [
                                      ...preState,
                                      values.requirements[index],
                                    ])

                                    remove(index)
                                  }}
                                >
                                  remove
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => push({ job: values.id, requires: '' })}
                      >
                        Add Friend
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <FormikContol
                control="input"
                name="deadline"
                className="deadline"
                type="datetime-local"
                label="Deadline:"
              />
              <FormikContol
                control="file"
                name="image"
                label="Image:"
                className="image"
              />
              <button type="submit" className="job-seeker_btn btn btn-primary">
                Update
              </button>
            </Form>
          )}
        </Formik>
      )
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default PutJobForm
