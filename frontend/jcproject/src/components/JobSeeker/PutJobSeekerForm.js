import { useChangeUserInfoMutation } from "@/store/features/userSlice";
import {
  useChangeJobSeekerInfoMutation,
  useGetJobSeekerByJobSeekerIdQuery,
} from "@/store/features/jobSeekerSlice";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { jobSeekerInitials, jobSeekerSignUpSchema } from "@/utils/jobSeeker";

const PutJobSeekerForm = () => {
  const [changeUserInfo, { isLoading, data:userData, error: myError }] =
  useChangeUserInfoMutation();
  const [
    changeJobSeekerInfo,
    {
      isLoading: jobSeekerIsLoading,
      data: jobSeekerData,
      error: jobSeekerError,
    },
  ] = useChangeJobSeekerInfoMutation();
  const router = useRouter();
  const { jobSeekerId } = router.query;
  const { data: jobSeeker } = useGetJobSeekerByJobSeekerIdQuery(
    parseInt(jobSeekerId)
  );

  return (
    <Formik
      initialValues={{
        user:jobSeeker?.user,
        date_of_birth: jobSeeker?.date_of_birth,
        nationality: jobSeeker?.nationality,
        location: jobSeeker?.location,
        high_qualification: jobSeeker?.high_qualification,
        years_of_experience: jobSeeker?.years_of_experience,
        available: jobSeeker?.available,
        job_sector: jobSeeker?.job_sector,
      }}
      validationSchema={jobSeekerSignUpSchema}
      onSubmit={async (values, actions) => {
        const {
          email,
          first_name,
          gender,
          last_name,
          middle_name,
          phone_number,
          date_of_birth,
          nationality,
          location,
          high_qualification,
          years_of_experience,
          available,
          job_sector,
        } = values;
        try {
          await changeUserInfo({
            email,
            first_name,
            gender,
            last_name,
            middle_name,
            phone_number,
          }).unwrap();
          await changeJobSeekerInfo({
            user:userData.id,
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
          <Field name="user.first_name">
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
          <Field name="user.last_name">
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
          <Field name="user.middle_name">
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

          <div>
            <label htmlfor="gender">Gender:</label>
            <Field
              id="gender"
              classname="gender"
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
          <Field name="user.date_of_birth">
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
          <Field name="user.nationality">
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

export default PutJobSeekerForm;
