import { user, userSignUpSchema } from "./user";
import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const jobSeekerInitials = {
  user: user,
  date_of_birth: "",
  nationality: "",
  location: "",
  high_qualification: "",
  years_of_experience: 0,
  available: true,
  job_sector: [
    {
      seeker: null,
      sector: "",
    },
  ],
};

export const jobSeekerSignUpSchema = Yup.object().shape({
  user: Yup.object().shape({ ...userSignUpSchema.clone().fields }),
  date_of_birth: Yup.string().required("Required field"),
  nationality: Yup.string().required("Required field"),
  location: Yup.string().required("Required field"),
  years_of_experience: Yup.string().required("Required field"),
  phone_number: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
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
  phone_number: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
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
