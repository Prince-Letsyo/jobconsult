import { useLoginUserMutation } from "@/store/features/authSlice";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

const logInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required field"),
  password: Yup.string().required("Password is required"),
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
          <Field name="password">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
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
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
