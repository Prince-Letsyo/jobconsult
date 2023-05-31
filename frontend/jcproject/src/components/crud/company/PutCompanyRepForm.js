import {
  useChangeCompanyRepInfoMutation,
  useGetCompanyRepByCompanyRepIdQuery,
} from "@/store/features/companyRepSlice";
import {
  useChangeUserInfoMutation,
  useGetUserByUserIdQuery,
} from "@/store/features/userSlice";
import { companyRepUpdateSchema } from "@/utils/company";
import { useGetGenricChoiceQuery } from "@/store/features/choices";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FormikContol from "@/components/forms/FormikContol";

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

  const {
    data: positionData,
    isLoading: isLoadingPosition,
    isSuccess: isSuccessPosition,
  } = useGetGenricChoiceQuery("position");

  const {
    data: sexData,
    isLoading: isLoadingSex,
    isSuccess: isSuccessSex,
  } = useGetGenricChoiceQuery("sex");

  useEffect(() => {
    return () => {};
  }, [userDate, positionData, sexData, companyRep]);

  return isSuccessGetCompanyRep && isSuccessPosition && isSuccessSex ? (
    !isLoadingGetCompanyRep && !isLoadingPosition && !isLoadingSex && (
      <Formik
        enableReinitialize={true}
        initialValues={{
          user: {
            ...companyRep.data.user,
          },
          position: companyRep.data.position,
        }}
        validationSchema={companyRepUpdateSchema}
        onSubmit={async (values, { resetForm }) => {
          const { user, position } = values;
          try {
            await changeCompanyRepInfo({
              position,
              user,
            })
              .unwrap()
              .then((repPayload) => {
                router.push("/dashboard/company-info/rep/");
                resetForm({ values: "" });
              })
              .catch((error) => console.log(error));
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values }) => (
          <Form className="generic-form">
            <FormikContol
              control="input"
              type="email"
              placeholder="example@gmail.com"
              name="user.email"
              label="Email:"
              className="email"
            />
            <FormikContol
              control="input"
              name="user.first_name"
              className="first_name"
              type="text"
              label="First name:"
              placeholder="John"
            />
            <FormikContol
              control="input"
              name="user.last_name"
              className="last_name"
              type="text"
              label="Last name:"
              placeholder="Doe"
            />
            <FormikContol
              control="input"
              name="user.middle_name"
              className="middle_name"
              type="text"
              label="Middle name:"
              placeholder="Yaw"
            />
            <FormikContol
              control="select"
              name="user.gender"
              className="gender"
              label="Gender:"
              placeholder="Gender"
              options={sexData.data}
            />
            <FormikContol
              control="input"
              name="user.phone_number"
              className="phone_number"
              type="tel"
              label="Phone number:"
              placeholder="+233454646458"
            />
            <FormikContol
              control="select"
              name="position"
              className="position"
              label="Position:"
              options={positionData.data}
            />
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
