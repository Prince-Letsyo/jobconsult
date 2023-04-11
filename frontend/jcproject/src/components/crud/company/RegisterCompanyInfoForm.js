import { useAddNewCompanyInfoMutation } from "@/store/features/companyInfoSlice";
import { companyInfo, companyInfoSignUpSchema } from "@/utils/company";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import Select from "@/utils/selectDb.json";

const RegisterCompanyInfoForm = ({ repId }) => {
  const router = useRouter();
  const [addNewCompanyInfo, { isLoading, data: userData, error: myError }] =
    useAddNewCompanyInfoMutation();
  return (
    <Formik
      initialValues={{
        ...companyInfo,
        representative: repId,
      }}
      validationSchema={companyInfoSignUpSchema}
      onSubmit={async (values, actions) => {
        try {
          await addNewCompanyInfo({
            ...values,
            representative: values.representative,
          }).unwrap();
        } catch (error) {}
      }}
    >
      {({ values }) => (
        <Form>
          <Field name="company_name">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
                <label htmlFor="company_name">Company name:</label>
                <input
                  type="text"
                  placeholder="Company name"
                  id="company_name"
                  className="company_name"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <div className="input-container">
            <label htmlFor="industry">Industry:</label>
            <Field
              component="select"
              id="industry"
              className="industry"
              name="industry"
            >
              <option value="">......select......</option>
              {Select.sector.map(({ key, value }, index) => (
                <option key={index} value={key}>
                  {value}
                </option>
              ))}
            </Field>
          </div>
          <div className="input-container">
            <label htmlFor="number_of_employees">Number of employees:</label>
            <Field
              component="select"
              id="number_of_employees"
              className="number_of_employees"
              name="number_of_employees"
            >
              <option value="">......select......</option>
              {Select.number_example.map(({ key, value }, index) => (
                <option key={index} value={key}>
                  {value}
                </option>
              ))}
            </Field>
          </div>
          <div className="input-container">
            <label htmlFor="type_of_employer">Type of employer:</label>
            <Field
              component="select"
              id="type_of_employer"
              className="type_of_employer"
              name="type_of_employer"
            >
              <option value="">......select......</option>
              {Select.employer_type.map(({ key, value }, index) => (
                <option key={index} value={key}>
                  {value}
                </option>
              ))}
            </Field>
          </div>
          <div className="input-container">
            <label htmlFor="hear_about">Heard about us:</label>
            <Field
              component="select"
              id="hear_about"
              className="hear_about"
              name="hear_about"
            >
              <option value="">......select......</option>
              {Select.heard.map(({ key, value }, index) => (
                <option key={index} value={key}>
                  {value}
                </option>
              ))}
            </Field>
          </div>
          <Field name="website">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
                <label htmlFor="website">Website:</label>
                <input
                  type="text"
                  placeholder="https//www.example.com"
                  id="website"
                  className="website"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="contact_person">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
                <label htmlFor="contact_person">Contact person:</label>
                <input
                  type="text"
                  placeholder="eg. John Doe"
                  id="contact_person"
                  className="contact_person"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="company_email">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
                <label htmlFor="company_email">Contact email:</label>
                <input
                  type="text"
                  placeholder="Company email"
                  id="company_email"
                  className="company_email"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="company_phone_number">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
                <label htmlFor="company_phone_number">
                  Company phone number:
                </label>
                <input
                  type="text"
                  placeholder="eg. +2337657675675"
                  id="company_phone_number"
                  className="company_phone_number"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="address">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
                {`${values.address}`}
                <label htmlFor="address">Address:</label>
                <textarea id="address" className="address" {...field} />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="image">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
                <label htmlFor="image">Company image:</label>
                <input type="text" id="image" className="image" {...field} />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <button type="submit" className="company_info_btn btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterCompanyInfoForm;
