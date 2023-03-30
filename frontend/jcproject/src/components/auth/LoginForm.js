import { useLoginUserMutation } from "@/store/features/authSlice";
import { userSignUpSchema } from "@/utils/user";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

const logInSchema = Yup.object().shape({
  email: userSignUpSchema.clone().fields.email,
  password: userSignUpSchema.clone().fields.passwordOne,
});
const LoginForm = () => {
  const [loginUser, { isLoading, data, error: myError }] =
    useLoginUserMutation();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={logInSchema}
      onSubmit={async (values, actions) => {
        try {
          await loginUser(values).unwrap();
        } catch (error) {}
      }}
    >
      {({ values }) => (
        <Form>
          <Field name="email">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
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
          <Field name="password">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-container">
                <label htmlfor="password">Password:</label>
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
