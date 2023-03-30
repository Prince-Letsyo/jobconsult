import {
    useChangeCompanyRepInfoMutation,
    useGetCompanyRepByCompanyRepIdQuery,
} from "@/store/features/companyRepSlice";
import { useChangeUserInfoMutation } from "@/store/features/userSlice";
import { companyRepSignUpSchema } from "@/utils/company";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";

const PutCompanyRepForm = () => {
  const [changeUserInfo, { isLoading, data: userData, error: myError }] =
    useChangeUserInfoMutation();

  const [
    changeCompanyRepInfo,
    {
      isLoading: companyRepIsLoading,
      data: companyRepData,
      error: companyRepError,
    },
  ] = useChangeCompanyRepInfoMutation();

  const router = useRouter();
  const { companyRepId } = router.query;
  const { data: companyRep } = useGetCompanyRepByCompanyRepIdQuery(
    parseInt(companyRepId)
  );
  return (
    <Formik
      initialValues={{
        user: companyRep?.user,
        position: companyRep?.position,
      }}
      validationSchema={companyRepSignUpSchema}
      onSubmit={async (values, actions) => {
        const { user, position } = values;
        try {
          await changeUserInfo({
            ...user,
          }).unwrap();
          await changeCompanyRepInfo({
            user: userData.id,
            position,
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
          <div>
            <label htmlFor="position"> Qualification:</label>
            <Field
              component="select"
              id="position"
              className="position"
              name="position"
            >
              <option value="">......select......</option>
              <option value="c-level">
                C-level: CEO / COO / CIO / CFO / CTO / CPO
              </option>
              <option value="senior-managements">
                Senior Management: Head of Department / Team Lead
              </option>
              <option value="middle-managements">
                Middle Management: Supervisor / Unit Head
              </option>
              <option value="junior-managements">
                Junior Level: Associate / Officer
              </option>
            </Field>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PutCompanyRepForm;
