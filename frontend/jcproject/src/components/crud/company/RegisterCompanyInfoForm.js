import { useAddNewCompanyInfoMutation } from "@/store/features/companyInfoSlice";
import { companyInfo, companyInfoSignUpSchema } from "@/utils/company";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import Select from "@/utils/selectDb.json";
import FormikContol from "@/components/forms/FormikContol";

const RegisterCompanyInfoForm = ({ repId }) => {
  const router = useRouter();
  const [addNewCompanyInfo, { isLoading, data: userData, error: myError }] =
    useAddNewCompanyInfoMutation();
  return (
    <Formik
      initialValues={{
        ...companyInfo,
        representative: repId,
      }}
      // validationSchema={companyInfoSignUpSchema}
      onSubmit={async (values, actions) => {
        let data = new FormData()
        data.append("representative", values.representative)
        data.append("company_name", values.company_name)
        data.append("industry", values.industry)
        data.append("number_of_employees", values.number_of_employees)
        data.append("type_of_employer", values.type_of_employer)
        data.append("hear_about", values.hear_about)
        data.append("website", values.website)
        data.append("contact_person", values.contact_person)
        data.append("company_email", values.company_email)
        data.append("company_phone_number", values.company_phone_number)
        data.append("country", values.country)
        data.append("address", values.address)
        data.append("image", values.image)
        try {
          await addNewCompanyInfo(data).unwrap().then((payload)=>console.log(payload));
        } catch (error) {
          console.log(error)
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
            options={Select.sector}
          />
          <FormikContol
            control="select"
            name="number_of_employees"
            label="Number of employees:"
            className="number_of_employees"
            options={Select.number_example}
          />
          <FormikContol
            control="select"
            name="type_of_employer"
            label="Type of employer:"
            className="type_of_employer"
            options={Select.employer_type}
          />
          <FormikContol
            control="select"
            name="hear_about"
            label="Heard about us:"
            className="hear_about"
            options={Select.heard}
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
            label="Image:"
            className="image"
          />

          <button type="submit" className="company_info_btn btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterCompanyInfoForm;
