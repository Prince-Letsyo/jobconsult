import * as Yup from "yup";

export const userPassworrdReset = {
  uidb64: "",
  token: "",
  passwordOne: "",
  passwordTwo: "",
};
export const user = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
  first_name: "",
  last_name: "",
  middle_name: "",
  gender: "",
  user_type: "",
  phone_number: "",
  redirect_url: "http://localhost:3000/",
};

export const userSignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required field"),
  passwordOne: Yup.string().required("Password is required"),
  passwordTwo: Yup.string().oneOf(
    [Yup.ref("passwordOne"), null],
    "Passwords must match"
  ),
  first_name: Yup.string().required("Required field"),
  last_name: Yup.string().required("Required field"),
});

export const userPassworrdResetSignUpSchema = Yup.object().shape({
  passwordOne: userSignUpSchema.clone().fields.passwordOne,
  passwordTwo: userSignUpSchema.clone().fields.passwordTwo,
});
