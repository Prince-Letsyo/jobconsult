import FormikContol from '@/components/forms/FormikContol'
import { useGetGenricChoiceQuery } from '@/store/features/choices'
import { useGetCompanyInfosQuery } from '@/store/features/companyInfoSlice'
import {
  useAddNewJobRequirementMutation,
  useGetJobRequirementsQuery,
} from '@/store/features/jobRequirementsSlice'
import {
  useAddNewJobResponsibilityMutation,
  useGetJobResponsibilitiesQuery,
} from '@/store/features/jobResponsibilitiesSlice'
import {
  useChangeJobInfoMutation,
  useGetJobByJobIdQuery,
  useMutateJobInfoMutation,
} from '@/store/features/jobsSlice'
import { useGetUserByUserIdQuery } from '@/store/features/userSlice'
import { convertImageUrlToFile, objectToFormData } from '@/utils'
import { jobRegisterSchema } from '@/utils/job'
import { format } from 'date-fns'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

const PutJobForm = ({ jobData }) => {
  const {
    data: companies,
    isLoading: isLoadingCompany,
    isSuccess: isSuccessCompany,
    isError: isErrorCompany,
    error: errorCompany,
  } = useGetCompanyInfosQuery('getCompanyInfos')
  const router = useRouter()
  const [imageFile, setImageFile] = useState('')
  const [
    addNewJobRequirement,
    {
      isLoading: isLoadingAddNewJobRequirement,
      data: dataAddNewJobRequirement,
    },
  ] = useAddNewJobRequirementMutation()

  const [
    addNewJobResponsibility,
    {
      isLoading: isLoadingAddNewJobResponsibility,
      data: dataAddNewJobResponsibility,
    },
  ] = useAddNewJobResponsibilityMutation()
  const [
    mutateJobInfo,
    { isLoading: isLoadingMutateJobInfo, data: dataMutateJobInfo },
  ] = useMutateJobInfoMutation()
  const [
    changeJobInfo,
    { isLoading: isLoadingChangeJobInfo, data: dataChangeJobInfo },
  ] = useChangeJobInfoMutation()

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
    convertImageUrlToFile(jobData.image).then((imagePayload) =>
      setImageFile(imagePayload),
    )
    return () => {}
  }, [sectorData, jobTypeData, qualicationData, typeEmploymentData, imageFile])

  return !isLoadingSector &&
  !isLoadingQualication &&
  !isLoadingJobType &&
  !isLoadingTypeEmployment && typeof imageFile !="string" ? (
  isSuccessSector &&
    isSuccessJobType &&
    isSuccessQualication &&
    isSuccessTypeEmployment && (
    <Formik
      initialValues={{
        id: jobData.id,
        title: jobData.title,
        location: jobData.location,
        description: jobData.description,
        sector: jobData.sector,
        type_of_job: jobData.type_of_job,
        deadline: format(new Date(jobData.deadline),"yyyy-MM-dd HH:mm"),
        minimum_qualification: jobData.minimum_qualification,
        type_of_employment: jobData.type_of_employment,
        experience_length: jobData.experience_length,
        number_of_required_applicantion:
          jobData.number_of_required_applicantion,
        responsibilities: jobData.responsibilities,
        requirements: jobData.requirements,
        publisher: jobData.publisher,
        company_name: jobData.company_name.representative.user.id,
        type_of_publisher: jobData.type_of_publisher,
        image: imageFile,
      }}
      // validationSchema={jobRegisterSchema}
      onSubmit={async (values, actions) => {
        try {
          const data = objectToFormData(values)
          await changeJobInfo(data).unwrap()
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
            control="input"
            type="text"
            placeholder="Job location"
            name="location"
            label="Job location:"
            className="job-location"
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
                            <button type="button" onClick={() => remove(index)}>
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
                            <button type="button" onClick={() => remove(index)}>
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
  )  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default PutJobForm
