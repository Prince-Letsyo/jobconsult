import * as Yup from "yup";

export const jobInitials = {
  title: "",
  location: "",
  description: "",
  company_name: 1,
  sector: "",
  type_of_job: "",
  deadline: "",
  minimum_qualification: "",
  type_of_employment: "",
  experience_length: 1,
  number_of_required_applicantion: 1,
  responsibilities: [
    {
      job: 1,
      assign: "",
    },
  ],
  requirements: [
    {
      job: 1,
      requires: "",
    },
  ],
  slug: "",
  type_of_publisher: "",
  publisher: 1,
};

export const jobRegisterSchema = Yup.object().shape({
  title: Yup.string().required("Required field"),
  location: Yup.string().required("Required field"),
  description: Yup.string().required("Required field"),
  deadline: Yup.string().required("Required field"),
});
