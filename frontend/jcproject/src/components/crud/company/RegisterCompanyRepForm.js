import { useRegisterNewUserMutation } from "@/store/features/authSlice";
import { useAddNewCompanyRepMutation } from "@/store/features/companyRepSlice";
import { companyRep, companyRepSignUpSchema } from "@/utils/company";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RegisterCompanyRepForm = () => {
  const [webUrl, setWebUrl] = useState("");
  const [registerNewUser, { isLoading, data: userData, error: myError }] =
    useRegisterNewUserMutation();
  const [
    addNewCompanyRep,
    { isLoadingCompanyRep, data: companyRepData, error: Error },
  ] = useAddNewCompanyRepMutation();
  const router = useRouter();
  useEffect(() => {
    setWebUrl(`${window.location.origin}/account/verification/`);
    return () => {};
  }, []);

  return (
    <Formik
      initialValues={companyRep}
      validationSchema={companyRepSignUpSchema}
      onSubmit={async (values, actions) => {
        const { user, position } = values;
        try {
          const {
            email,
            passwordOne,
            first_name,
            last_name,
            middle_name,
            gender,
            phone_number,
          } = user;
          await registerNewUser({
            email,
            password: passwordOne,
            first_name,
            last_name,
            middle_name,
            gender,
            phone_number,
            user_type: "company-rep",
            redirect_url: webUrl,
          })
            .unwrap()
            .then((payload) =>
              addNewCompanyRep({
                user: payload.data.user_id,
                position,
              })
                .unwrap()
                .then((repPayload) => {
                  actions.resetForm({ values: "" });
                  router.push("/account/log-in");
                })
                .finally()
            )
            .catch((error) => console.log(error));
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ values }) => (
        <Form className="generic-form">
          <Field name="user.email">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
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
              <div className="input-container">
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
              <div className="input-container">
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
              <div className="input-container">
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
              <div className="input-container">
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
              <div className="input-container">
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
          <div className="input-container">
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
              <div className="input-container">
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
          <button type="submit" className="companyRep_btn btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterCompanyRepForm;
