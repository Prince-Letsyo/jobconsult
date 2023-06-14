import { phoneRegExp, user, userSignUpSchema } from "./user";
import * as Yup from "yup";


export const jobSeekerInitials = {
  user: user,
  date_of_birth: "",
  nationality: "",
  city: "",
  high_qualification: "",
  years_of_experience: 0,
  available: true,
  job_sector: [],
};

export const jobSeekerSignUpSchema = Yup.object().shape({
  user: Yup.object().shape({ ...userSignUpSchema.clone().fields }),
  date_of_birth: Yup.string().required("Required field"),
  nationality: Yup.string().required("Required field"),
  location: Yup.string().required("Required field"),
  years_of_experience: Yup.number().required("Required field"),
  high_qualification: Yup.string().required("Required field"),
  phone_number:Yup.string().required('Phone number is required').matches(phoneRegExp, 'Invalid phone number'),
  job_sector: Yup.array().of(
    Yup.object().shape({
      sector: Yup.string().required("Required field"),
    })
  ),
});

export const jobSeekerUpdateSchema = Yup.object().shape({
  user: Yup.object().shape({
    first_name: userSignUpSchema.clone().fields.first_name,
    last_name: userSignUpSchema.clone().fields.last_name,
    email: userSignUpSchema.clone().fields.email,
  }),
  date_of_birth: Yup.string().required("Required field"),
  nationality: Yup.string().required("Required field"),
  location: Yup.string().required("Required field"),
  years_of_experience: Yup.string().required("Required field"),
  high_qualification: Yup.string().required("Required field"),
  job_sector: Yup.array().of(
    Yup.object().shape({
      sector: Yup.string().required("Required field"),
    })
  ),
  phone_number:Yup.string().required('Phone number is required').matches(phoneRegExp, 'Invalid phone number'),
    
});

const updateArray = (genericArray) =>
  genericArray.filter(
    (sector) =>
      sector.sector != "" &&
      (sector.id == undefined || sector.id == null) && {
        ...sector,
      }
  );

const changeArray = (genericArray) =>
  genericArray.filter(
    (sector) =>
      sector.sector != "" && {
        ...sector,
      }
  );
export const makeUnique = (genericArray, update) =>
  Array.from(
    (update ? updateArray(genericArray) : changeArray(genericArray))
      .reduce((map, obj) => map.set(obj.sector, obj), new Map())
      .values()
  );
