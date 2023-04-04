import { useLoginUserMutation } from "@/store/features/authSlice";
import { setCredentials } from "@/store/features/authSlice/jwtAuthSlice";
import { userSignUpSchema } from "@/utils/user";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const logInSchema = Yup.object().shape({
  email: userSignUpSchema.clone().fields.email,
  password: userSignUpSchema.clone().fields.passwordOne,
});
const LoginForm = () => {
  const [loginUser, { isLoading, data, error: myError }] =
    useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {};
  }, [data, myError]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={logInSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await loginUser(values)
            .unwrap()
            .then((payload) => {
              dispatch(setCredentials({ ...payload.data}))
              resetForm({ values: "" });
              router.push(`/dashboard/jobseeker/`)
            });
        } catch (error) {}
      }}
    >
      {({ values }) => (
        <Form className="generic-form">
          <Field name="email">
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
          <Field name="password">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="password"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <button type="submit" className="login_user_btn btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
