import {
  useChangeCompanyRepInfoMutation,
  useGetCompanyRepByCompanyRepIdQuery,
} from "@/store/features/companyRepSlice";
import {
  useChangeUserInfoMutation,
  useGetUserByUserIdQuery,
} from "@/store/features/userSlice";
import {
  companyRepSignUpSchema,
  companyRepUpdateSchema,
} from "@/utils/company";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Select from "@/utils/selectDb.json";

const PutCompanyRepForm = ({ repId }) => {
  const router = useRouter();
  const [
    changeUserInfo,
    { isLoading: isLoadingChangeUserInfo, data: userData, error: myError },
  ] = useChangeUserInfoMutation(repId ?? skipToken);

  const [
    changeCompanyRepInfo,
    {
      isLoading: companyRepIsLoading,
      data: companyRepData,
      isSuccess: isSuccessCompanyRep,
    },
  ] = useChangeCompanyRepInfoMutation();

  const { data: userDate, isSuccess: isSuccessUserData } =
    useGetUserByUserIdQuery(repId ?? skipToken);

  const {
    data: companyRep,
    isSuccess: isSuccessGetCompanyRep,
    isLoading: isLoadingGetCompanyRep,
  } = useGetCompanyRepByCompanyRepIdQuery(repId ?? skipToken);

  useEffect(() => {
    return () => {};
  }, [userDate, companyRep]);
  return isSuccessUserData && isSuccessGetCompanyRep ? (
    !isLoadingChangeUserInfo && !isLoadingGetCompanyRep && (
      <Formik
        enableReinitialize={true}
        initialValues={{
          user: {
            ...userDate.data,
          },
          position: companyRep.data.position,
        }}
        validationSchema={companyRepUpdateSchema}
        onSubmit={async (values, { resetForm }) => {
          const { user, position } = values;
          try {
            await changeUserInfo({
              ...user,
            })
              .unwrap()
              .then((payload) =>
                changeCompanyRepInfo({
                  user: payload.data.id,
                  position,
                })
                  .unwrap()
                  .then((repPayload) => {
                    router.push("/dashboard/company-info/rep/");
                    resetForm({ values: "" });
                  })
                  .catch((error) => console.log(error))
              );
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values }) => (
          <Form>
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
            <div className="input-container">
              <label htmlFor="position"> Position:</label>
              <Field
                component="select"
                id="position"
                className="position"
                name="position"
              >
                <option value="">......select......</option>
                {Select.position.map(({ key, value }, index) => (
                  <option key={index} value={key}>
                    {value}
                  </option>
                ))}
              </Field>
            </div>
            <button type="submit" className="company_rep_btn btn btn-primary">
              Update
            </button>
          </Form>
        )}
      </Formik>
    )
  ) : (
    <div>Loading...</div>
  );
};

export default PutCompanyRepForm;
