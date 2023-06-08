import FormikContol from '@/components/forms/FormikContol'
import { Form, Formik } from 'formik'
import React from 'react'

const JobApplication = () => {
  return (
    <Formik
      initialValues={{
        job: '',
        seeker: '',
        code: '',
        documents: '',
        accepted: '',
        date_applied: '',
      }}
      onSubmit={async (value) => {}}
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
          />{' '}
          <button type="submit" className="job-seeker_btn btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default JobApplication
