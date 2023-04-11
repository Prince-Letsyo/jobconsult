import { useRequestPasswordResetMutation } from "@/store/features/authSlice";
import { userSignUpSchema } from "@/utils/user";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";

const requestPasswordResetSchema = Yup.object().shape({
  email: userSignUpSchema.clone().fields.email,

});

const RequestPasswordResetForm = () => {
  const [requestPasswordReset, { isLoading, data, error: myError }] =
    useRequestPasswordResetMutation();
  const router = useRouter();

  useEffect(() => {
    console.log("myError", myError);
    return () => {};
  }, [myError]);

  return (
    <Formik
      initialValues={{
        email: "",
        redirect_url: "http://localhost:3000/account/password_reset_complete/",
      }}
      validationSchema={requestPasswordResetSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await requestPasswordReset(values).unwrap();
          resetForm({ values: "" });
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
          <button type="submit" className="login_user_btn btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RequestPasswordResetForm;
