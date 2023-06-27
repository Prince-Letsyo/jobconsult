import FormikContol from '@/components/forms/FormikContol'
import { useAddNewApplicationDocMutation } from '@/store/features/applicantDocSlice'
import { useAddNewJobApplicationMutation } from '@/store/features/jobApplicationSlice'
import { currentDateTime, objectToFormData } from '@/utils'
import { SUPPORTED_DOC_FORMATS, jobApplicationSchema } from '@/utils/job'
import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'

const JobApplication = ({ user }) => {
  const [addNewJobApplication, {}] = useAddNewJobApplicationMutation()
  const [addNewApplicationDoc, {}] = useAddNewApplicationDocMutation()
  useEffect(() => {
    console.log(user)
    return () => {}
  }, [])
  return (
    <Formik
      initialValues={{
        ...user,
        documents: '',
        date_applied: '',
      }}
      validationSchema={jobApplicationSchema}
      onSubmit={async (value) => {
        const { job, seeker, date_applied, documents } = value
        try {
          addNewJobApplication({
            job,
            seeker,
            date_applied:currentDateTime(),
            documents: [],
          })
            .unwrap()
            .then((payload) => {
              if (documents.length !== 0) {
                Object.entries(documents).map(([key, file]) => {
                  const data = objectToFormData({
                    job_application: payload.data.id,
                    document:file,
                  })
                  addNewApplicationDoc(data)
                    .unwrap()
                    .then((payloadDoc) => {
                      console.log(payloadDoc.data)
                    })
                    .catch((error) => console.log(error))
                })
              }
            })
            .catch((error) => console.log(error))
        } catch (error) {}
      }}
    >
      {({ values }) => (
        <Form className="generic-form">
          <FormikContol
            control="multi-doc-file"
            accept={SUPPORTED_DOC_FORMATS.join(',')}
            name="documents"
            label="Document:"
            className="documents"
          />
          <button type="submit" className="job-seeker_btn btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default JobApplication
