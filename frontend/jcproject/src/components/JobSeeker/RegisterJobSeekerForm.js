import { useRegisterNewUserMutation } from "@/store/features/authSlice";
import { useAddNewJobSeekerMutation } from "@/store/features/jobSeekerSlice";
import { jobSeekerInitials, jobSeekerSignUpSchema } from "@/utils/jobSeeker";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";

const RegisterJobSeekerForm = () => {
  const [registerNewUser, { isLoading, data:userData, error: myError }] =
    useRegisterNewUserMutation();
  const [
    addNewJobSeeker,
    {
      isLoading: jobSeekerIsLoading,
      data: jobSeekerData,
      error: jobSeekerError,
    },
  ] = useAddNewJobSeekerMutation();
  const router = useRouter();
  return (
    <Formik
      initialValues={jobSeekerInitials}
      validationSchema={jobSeekerSignUpSchema}
      onSubmit={async (values, actions) => {
        // actions.;
        const {
          user,
          date_of_birth,
          nationality,
          location,
          high_qualification,
          years_of_experience,
          available,
          job_sector,
        } = values;
        try {
          await registerNewUser({
            ...user,
            user_type: "seeker",
          }).unwrap();
          await addNewJobSeeker({
            user: userData.id,
            date_of_birth,
            nationality,
            location,
            high_qualification,
            years_of_experience,
            available,
            job_sector,
          }).unwrap();
        } catch (error) {}
      }}
    >
      {({ values }) => (
        <Form>
          <Field name="user.email">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="email"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="user.first_name">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="first_name">First name:</label>
                <input
                  type="text"
                  placeholder="First name"
                  id="first_name"
                  className="first_name"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="user.last_name">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="last_name">Last name:</label>
                <input
                  type="text"
                  placeholder="Last name"
                  id="last_name"
                  className="last_name"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="user.middle_name">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="middle_name">Middle name:</label>
                <input
                  type="text"
                  placeholder="Middle name"
                  id="middle_name"
                  className="middle_name"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="user.passwordOne">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="passwordOne">Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="passwordOne"
                  className="passwordOne"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="user.passwordTwo">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="passwordTwo">Confirm password:</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="passwordTwo"
                  className="passwordTwo"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <div>
            <label htmlFor="gender">Gender:</label>
            <Field
              id="gender"
              className="gender"
              name="user.gender"
              component="select"
            >
              <option value="">......select......</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Field>
          </div>
          <Field name="user.phone_number">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="phone_number">Phone number:</label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  id="phone_number"
                  className="phone_number"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="date_of_birth">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="date_of_birth">Date of birth</label>
                <input
                  type="date"
                  placeholder="Date of birth"
                  id="date_of_birth"
                  className="date_of_birth"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="nationality">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="nationality">Nationality:</label>
                <input
                  type="text"
                  placeholder="Nationality:"
                  id="nationality"
                  className="nationality"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="location">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  placeholder="Location:"
                  id="location"
                  className="location"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <div>
            <label htmlFor="high_qualification"> Qualification:</label>
            <Field
              component="select"
              id="high_qualification"
              className="high_qualification"
              name="high_qualification"
            >
              <option value="">......select......</option>
              <option value="degree">Degree</option>
              <option value="diploma">Diploma</option>
              <option value="wassce-ssce">WASSCE / SSCE</option>
              <option value="hnd">HND</option>
              <option value="mba-msc">MBA / MSc</option>
              <option value="mbbs">MBBS</option>
              <option value="mphil-phd">MPhil / PhD</option>
              <option value="nce">NCE</option>
              <option value="ond">OND</option>
              <option value="others">Others</option>
              <option value="vocational">Vocational</option>
            </Field>
          </div>

          <Field name="years_of_experience">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="years_of_experience">Experience:</label>
                <input
                  type="number"
                  placeholder="Experience:"
                  id="years_of_experience"
                  className="years_of_experience"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <div>
            <label htmlFor="available">Available</label>
            <Field type="checkbox" name="available" id="available" />
          </div>
          <div>
            <label htmlFor="job_sector">
              Which sectors do you want to work in?
            </label>
            <FieldArray name="job_sector">
              {({ insert, remove, push }) => (
                <div>
                  {values.job_sector.length > 0 &&
                    values.job_sector.map((sector, index) => (
                      <div key={index}>
                        <div>
                          <label htmlFor="sector-select">Qualification:</label>
                          <Field
                              component="select"
                              id="sector-select"
                              className="high_qualification"
                              name={`job_sector.${index}.sector`}
                          >
                            <option value="">......select......</option>
                            <option value="advertising-media-communications">
                              Advertising, Media & Communications
                            </option>
                            <option value="agriculture-fishing-forestry">
                              Agriculture, Fishing & Forestry
                            </option>
                            <option value="automotive-aviation">
                              Automotive & Aviation
                            </option>
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
                            <option value="hospitality-hotel">
                              Hospitality & Hotel
                            </option>
                            <option value="it-telecoms">IT & Telecoms</option>
                            <option value="law-compliance">
                              Law & Compliance
                            </option>
                            <option value="manufacturing-warehousing">
                              Manufacturing & Warehousing
                            </option>
                            <option value="mining-energy-metals">
                              Mining, Energy & Metals
                            </option>
                            <option value="ngo-npo-charity">
                              NGO, NPO & Charity
                            </option>
                            <option value="real-estate">Real Estate</option>
                            <option value="recruitment">Recruitment</option>
                            <option value="retail-fashion-fmcg">
                              Retail, Fashion & FMCG
                            </option>
                            <option value="shipping-logistics">
                              Shipping & Logistics
                            </option>
                            <option value="tourism-travel">
                              Tourism & Travel
                            </option>
                          </Field>
                        </div>
                        {values.job_sector.length >= 2 && (
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
                    onClick={() => push({ seeker: null, sector: "" })}
                  >
                    Add Friend
                  </button>
                </div>
              )}
            </FieldArray>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterJobSeekerForm;
