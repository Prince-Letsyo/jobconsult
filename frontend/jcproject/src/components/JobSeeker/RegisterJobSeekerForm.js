import { useRegisterNewUserMutation } from "@/store/features/authSlice";
import { useAddNewJobSeekerMutation } from "@/store/features/jobSeekerSlice";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required field"),
  passwordOne: Yup.string().required("Password is required"),
  passwordTwo: Yup.string().oneOf(
    [Yup.ref("passwordOne"), null],
    "Passwords must match"
  ),
  first_name: Yup.string().required("Required field"),
  last_name: Yup.string().required("Required field"),
  date_of_birth: Yup.string().required("Required field"),
  nationality: Yup.string().required("Required field"),
  location: Yup.string().required("Required field"),
  years_of_experience: Yup.string().required("Required field"),
  phone_number: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

const RegisterJobSeekerForm = () => {
  const [registerNewUser, { isLoading, data, error: myError }] =
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
      initialValues={{
        email: "",
        passwordOne: "",
        passwordTwo: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        gender: "",
        user_type: "seeker",
        phone_number: "",
        redirect_url: "http://localhost:3000/",
        date_of_birth: "",
        nationality: "",
        location: "",
        high_qualification: "",
        years_of_experience: 0,
        available: true,
        job_sector: [],
      }}
      validationSchema={signUpSchema}
      onSubmit={async (values, actions) => {
        // actions.;
        const {
          email,
          first_name,
          gender,
          last_name,
          middle_name,
          passwordOne: password,
          phone_number,
          redirect_url,
          user_type,
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
            email,
            first_name,
            gender,
            last_name,
            middle_name,
            password,
            phone_number,
            redirect_url,
            user_type,
          }).unwrap();
          await addNewJobSeeker({
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
      {({ values, }) => (
        <Form>
          <Field name="email">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlfor="email">Email:</label>
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
          <Field name="first_name">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlfor="first_name">First name:</label>
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
          <Field name="last_name">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlfor="last_name">Last name:</label>
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
          <Field name="middle_name">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlfor="middle_name">Middle name:</label>
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
          <Field name="passwordOne">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlfor="passwordOne">Password:</label>
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
          <Field name="passwordTwo">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlfor="passwordTwo">Confirm password:</label>
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
            <label htmlfor="gender">Gender:</label>
            <Field
              id="gender"
              classname="gender"
              name="gender"
              component="select"
            >
              <option value="">......select......</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Field>
          </div>
          <Field name="phone_number">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlfor="phone_number">Phone number:</label>
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
                <label htmlfor="date_of_birth">Date of birth</label>
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
                <label htmlfor="nationality">Nationality:</label>
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
                <label htmlfor="location">Location:</label>
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
            <label htmlfor="high_qualification"> Qualification:</label>
            <Field
              component="select"
              id="high_qualification"
              classname="high_qualification"
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
                <label htmlfor="years_of_experience">Experience:</label>
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
            <label htmlfor="available">Available</label>
            <Field type="checkbox" name="available" id="available" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterJobSeekerForm;
