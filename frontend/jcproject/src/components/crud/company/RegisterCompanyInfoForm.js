import { useAddNewCompanyInfoMutation } from "@/store/features/companyInfoSlice";
import { companyInfo, companyInfoSignUpSchema } from "@/utils/company";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import FormikContol from "@/components/forms/FormikContol";
import { useEffect } from "react";
import { formDataToObject, objToFormData, objectToFormData } from "@/utils";
import { useGetGenricChoiceQuery } from "@/store/features/choices";

const RegisterCompanyInfoForm = ({ repId }) => {
  const router = useRouter();
  const [addNewCompanyInfo, { isLoading, data: userData, error: myError }] =
    useAddNewCompanyInfoMutation();
  const {
    data: sectorData,
    isLoading: isLoadingSector,
    isSuccess: isSuccessSector,
  } = useGetGenricChoiceQuery("sector");
  const {
    data: number_employersData,
    isLoading: isLoadingNumber_employers,
    isSuccess: isSuccessNumber_employers,
  } = useGetGenricChoiceQuery("number_employers");
  const {
    data: employer_typesData,
    isLoading: isLoadingEmployer_type,
    isSuccess: isSuccessEmployer_type,
  } = useGetGenricChoiceQuery("employer_type");
  const {
    data: heardData,
    isLoading: isLoadingHeard,
    isSuccess: isSuccessHeard,
  } = useGetGenricChoiceQuery("heard");

  useEffect(() => {
    return () => {};
  }, [sectorData, number_employersData, employer_typesData, heardData]);
  return isSuccessSector &&
    isSuccessNumber_employers &&
    isSuccessHeard &&
    isSuccessEmployer_type ? (
    !isLoadingSector &&
      !isLoadingNumber_employers &&
      !isLoadingHeard &&
      !isLoadingEmployer_type && (
        <Formik
          initialValues={{
            ...companyInfo,
            representative: repId,
          }}
          // validationSchema={companyInfoSignUpSchema}
          onSubmit={async (values, actions) => {
            try {
              
            const  data = objectToFormData(values)
              await addNewCompanyInfo(data)
                .unwrap()
                .then((payload) => console.log(payload));
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ values, isValid }) => (
            <Form className="generic-form">
              <FormikContol
                control="input"
                type="text"
                placeholder="Company name"
                name="company_name"
                label="Company name:"
                className="company_name"
              />
              <FormikContol
                control="input"
                type="text"
                placeholder="eg. Ghana"
                name="country"
                label="Country:"
                className="country"
              />
              <FormikContol
                control="select"
                name="industry"
                label="Industry:"
                className="industry"
                options={sectorData.data}
              />
              <FormikContol
                control="select"
                name="number_of_employees"
                label="Number of employees:"
                className="number_of_employees"
                options={number_employersData.data}
              />
              <FormikContol
                control="select"
                name="type_of_employer"
                label="Type of employer:"
                className="type_of_employer"
                options={employer_typesData.data}
              />
              <FormikContol
                control="select"
                name="hear_about"
                label="Heard about us:"
                className="hear_about"
                options={heardData.data}
              />
              <FormikContol
                control="input"
                type="text"
                placeholder="https//www.example.com"
                name="website"
                label="Website:"
                className="website"
              />
              <FormikContol
                control="input"
                type="text"
                placeholder="eg. John Doe"
                name="contact_person"
                label="Contact person:"
                className="contact_person"
              />
              <FormikContol
                control="input"
                type="email"
                placeholder="https//www.companyexample.com"
                name="company_email"
                label="Contact email:"
                className="company_email"
              />
              <FormikContol
                control="input"
                type="tel"
                placeholder="eg. +2337657675675"
                name="company_phone_number"
                label="Company phone number:"
                className="company_phone_number"
              />
              <FormikContol
                control="textarea"
                name="address"
                label="Address:"
                className="address"
              />
              <FormikContol
                control="file"
                name="image"
                label="Company image :"
                className="image"
              />
              <button
                type="submit"
                className="company_info_btn btn btn-primary"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )
  ) : (
    <div>Loading...</div>
  );
};

export default RegisterCompanyInfoForm;
