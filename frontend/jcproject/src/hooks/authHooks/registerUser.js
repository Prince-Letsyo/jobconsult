import { useFormik } from "formik";
import * as Yup from "yup";
const { useRegisterNewUserMutation } = require("@/store/features/authSlice");
const { useRouter } = require("next/router");
const { useReducer } = require("react");

const createUser = () => {
  const [registerNewUser, { isLoading, data, error: myError }] =
    useRegisterNewUserMutation();
  const router = useRouter();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      email: "",
      passwordOne: "",
      passwordTwo: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      gender: "",
      user_type: "staff",
      phone_number: "",
      redirect_url: "http://localhost:3000/",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required field"),
      passwordOne: Yup.string().required("Password is required"),
      passwordTwo: Yup.string().oneOf(
        [Yup.ref("passwordOne"), null],
        "Passwords must match"
      ),
      first_name: Yup.string().required("Required field"),
      last_name: Yup.string().required("Required field"),
      phone_number: Yup.string().matches(
        phoneRegExp,
        "Phone number is not valid"
      ),
    }),
    onSubmit: async (values) => {
      const {
        email,
        first_name,
        gender,
        last_name,
        middle_name,
        passwordOne: password,
        phone_number,
        redirect_url,
        user_type,
      } = values;
      try {
        await registerNewUser({
          email,
          first_name,
          gender,
          last_name,
          middle_name,
          password,
          phone_number,
          redirect_url,
          user_type,
        }).unwrap();
        //TODO: see user data
        console.log(data);
      } catch (error) {
        console.log(myError);
      }
    },
  });

  return formik;
};

export default createUser;
