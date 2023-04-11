import { user, userSignUpSchema } from "./user";
import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const companyRep = {
  user: user,
  position: "",
};
export const companyInfo = {
  representative: null,
  company_name: "",
  industry: "",
  number_of_employees: "",
  type_of_employer: "",
  hear_about: "",
  website: "",
  contact_person: "",
  company_email: "",
  company_phone_number: "",
  country: "",
  address: "",
  image:""
};

export const companyRepSignUpSchema = Yup.object().shape({
  user: Yup.object().shape({ ...userSignUpSchema.clone().fields }),
});
export const companyRepUpdateSchema = Yup.object().shape({
  user: Yup.object().shape({
    first_name: userSignUpSchema.clone().fields.first_name,
    last_name: userSignUpSchema.clone().fields.last_name,
    email: userSignUpSchema.clone().fields.email,
  }), 
});

export const companyInfoSignUpSchema = Yup.object().shape({
  company_name: Yup.string().required("Company name is required"),
  contact_person: Yup.string().required("Contact person is required"),
  company_email: Yup.string().required("Company email is required"),
  company_phone_number: Yup.string().matches(
    phoneRegExp,
    "Phone number is not valid"
  ),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
  image: Yup.string().required("Image is required"),
});
