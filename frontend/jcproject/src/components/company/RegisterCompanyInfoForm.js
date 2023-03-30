import { useAddNewCompanyInfoMutation } from "@/store/features/companyInfoSlice";
import { companyInfo, companyInfoSignUpSchema } from "@/utils/company";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";

const RegisterCompanyInfoForm = () => {
  const router = useRouter();
  const [addNewCompanyInfo, { isLoading, data: userData, error: myError }] =
    useAddNewCompanyInfoMutation();
  return (
    <Formik
      initialValues={companyInfo}
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
              <div>
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
          <div>
            <label htmlFor="industry">Industry:</label>
            <Field
              component="select"
              id="industry"
              className="industry"
              name="industry"
            >
              <option value="">......select......</option>
              <option value="advertising-media-communications">
                Advertising, Media & Communications
              </option>
              <option value="agriculture-fishing-forestry">
                Agriculture, Fishing & Forestry
              </option>
              <option value="automotive-aviation">Automotive & Aviation</option>
              <option value="banking-finance-insurance">
                Banking, Finance & Insurance
              </option>
              <option value="construction">Construction</option>
              <option value="education">Education</option>
              <option value="enforcement-security">
                Enforcement & Security
              </option>
              <option value="entertainment-events-sport">
                Entertainment, Events & Sport
              </option>
              <option value="government">Government</option>
              <option value="healthcare">Healthcare</option>
              <option value="hospitality-hotel">Hospitality & Hotel</option>
              <option value="it-telecoms">IT & Telecoms</option>
              <option value="law-compliance">Law & Compliance</option>
              <option value="manufacturing-warehousing">
                Manufacturing & Warehousing
              </option>
              <option value="mining-energy-metals">
                Mining, Energy & Metals
              </option>
              <option value="ngo-npo-charity">NGO, NPO & Charity</option>
              <option value="real-estate">Real Estate</option>
              <option value="recruitment">Recruitment</option>
              <option value="retail-fashion-fmcg">
                Retail, Fashion & FMCG
              </option>
              <option value="shipping-logistics">Shipping & Logistics</option>
              <option value="tourism-travel">Tourism & Travel</option>
            </Field>
          </div>
          <div>
            <label htmlFor="number_of_employees">Number of employees:</label>
            <Field
              component="select"
              id="number_of_employees"
              className="number_of_employees"
              name="number_of_employees"
            >
              <option value="">......select......</option>
              <option value="1">1-4</option>
              <option value="2">5-10</option>
              <option value="3">11-25</option>
              <option value="4">26-50</option>
              <option value="5">51-100</option>
              <option value="6">101-200</option>
              <option value="7">201-500</option>
              <option value="8">501-1000</option>
              <option value="9">1000+</option>
            </Field>
          </div>
          <div>
            <label htmlFor="type_of_employer">Type of employer:</label>
            <Field
              component="select"
              id="type_of_employer"
              className="type_of_employer"
              name="type_of_employer"
            >
              <option value="">......select......</option>
              <option value="direct-employer">Direct Employer</option>
              <option value="recruitment-agency">Recruitment Agency</option>
            </Field>
          </div>
          <div>
            <label htmlFor="hear_about">Heard about us:</label>
            <Field
              component="select"
              id="hear_about"
              className="hear_about"
              name="hear_about"
            >
              <option value="">......select......</option>
              <option value="online-search">Online Search</option>
              <option value="online-adverts">Online Adverts</option>
              <option value="social-media">
                Social Media (Linkedin,Twitter etc)
              </option>
              <option value="email-marketing">Email Marketing</option>
              <option value="billboards">Billboards</option>
              <option value="radio">Radio</option>
              <option value="newspaper">Newspaper</option>
              <option value="magazines">Magazines</option>
              <option value="direct-mail">Direct Mail</option>
              <option value="referral">Referral</option>
              <option value="event">Event</option>
              <option value="others">Others</option>
            </Field>
          </div>
          <Field name="website">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
                <label htmlFor="image">Company image:</label>
                <input type="text" id="image" className="image" {...field} />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterCompanyInfoForm;
