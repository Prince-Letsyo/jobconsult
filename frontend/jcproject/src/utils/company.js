import { phoneRegExp, user, userSignUpSchema } from "./user";
import * as Yup from "yup";

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
  image: null,
};

export const companyRepSignUpSchema = Yup.object().shape({
  user: Yup.object().shape({ ...userSignUpSchema.clone().fields }),
  position:Yup.string().required("Required field"),
});

export const companyRepUpdateSchema = Yup.object().shape({
  user: Yup.object().shape({
    first_name: userSignUpSchema.clone().fields.first_name,
    last_name: userSignUpSchema.clone().fields.last_name,
    email: userSignUpSchema.clone().fields.email,
  }),
});

const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];
export const companyInfoSignUpSchema = Yup.object().shape({
  company_name: Yup.string().required("Company name is required"),
  contact_person: Yup.string().required("Contact person is required"),
  company_email: Yup.string()
    .email("Invalid email address")
    .required("Required field"),
  company_phone_number: Yup.string().matches(
    phoneRegExp,
    "Phone number is not valid"
  ),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
  image: Yup.mixed()
    .nullable()
    .required("Image is required")
    .test(
      "FILE_SIZE",
      "Uploaded file is too big",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});
