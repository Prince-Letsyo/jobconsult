import { useRequestPasswordResetMutation } from "@/store/features/authSlice";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

const requestPasswordResetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required field"),
  password: Yup.string().required("Password is required"),
});
const RequestPasswordResetForm = () => {
  const [requestPasswordReset, { isLoading, data, error: myError }] =
    useRequestPasswordResetMutation();
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={requestPasswordResetSchema}
      onSubmit={async (values, actions) => {
        try {
          await requestPasswordReset(values).unwrap();
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
        </Form>
      )}
    </Formik>
  );
};

export default RequestPasswordResetForm;
