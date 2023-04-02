import FormContainer from "@/components/forms/FormContainer";
import {
  usePasswordResetCompleteMutation,
  usePasswordResetMutation,
} from "@/store/features/authSlice";
import {
  userPassworrdReset,
  userPassworrdResetSignUpSchema,
} from "@/utils/user";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const PasswordResetComplete = () => {
  const router = useRouter();
  const { uidb64, token } = router.query;
  const [
    passwordReset,
    { isError: isErrorPasswordReset, isSuccess: isSuccessPasswordReset },
  ] = usePasswordResetMutation();
  const [
    passwordResetComplete,
    {
      isError: isErrorPasswordResetComplete,
      isSuccess: isSuccessPasswordResetComplete,
    },
  ] = usePasswordResetCompleteMutation();
  useEffect(() => {
    token && passwordReset({ token, uidb64 }).unwrap();
    return () => {};
  }, [token]);
  return (
    <div>
      {!isErrorPasswordReset ? (
        <FormContainer title={"Passwod Reset"} tale={""} href={""}>
          {isSuccessPasswordReset ? (
            <Formik
              initialValues={{
                ...userPassworrdReset,
                uidb64,
                token,
              }}
              validationSchema={userPassworrdResetSignUpSchema}
              onSubmit={async (values, { resetForm }) => {
                const { uidb64, token, passwordOne } = values;

                try {
                  passwordResetComplete({
                    uidb64,
                    token,
                    password: passwordOne,
                  }).unwrap();
                  resetForm({ values: "" });
                  router.push("/account/log-in/");
                } catch (error) {}
              }}
            >
              {({ values }) => (
                <Form className="generic-form">
                  <Field name="passwordOne">
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
                  <Field name="passwordTwo">
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

                  <button
                    type="submit"
                    className="job-seeker_btn btn btn-primary"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </FormContainer>
      ) : (
        <div>
          Credentials has expireed or tempted with. Click
          <Link href={"/account/reset_password/"}>Link</Link> to request
          passworrd.
        </div>
      )}
    </div>
  );
};

export default PasswordResetComplete;
