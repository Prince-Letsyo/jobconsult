import { useRegisterNewUserMutation } from "@/store/features/authSlice";
import { useAddNewJobSeekerMutation } from "@/store/features/jobSeekerSlice";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

const postSeeker = () => {
  const [registerNewUser, { isLoading, data, error: myError }] =
    useRegisterNewUserMutation();
  const [
    addNewJobSeeker,
    {
      isLoading: jobSeekerIsLoading,
      data: jobSeekerData,
      error: jobSeekerError,
    },
  ] = useAddNewJobSeekerMutation();
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
      user_type: "seeker",
      phone_number: "",
      redirect_url: "http://localhost:3000/",
      date_of_birth: "",
      nationality: "",
      location: "",
      high_qualification: "",
      years_of_experience: 0,
      available: true,
      job_sector:[]
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
      date_of_birth: Yup.string().required("Required field"),
      nationality: Yup.string().required("Required field"),
      location: Yup.string().required("Required field"),
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
        date_of_birth,
        nationality,
        location,
        high_qualification,
        years_of_experience,
        available,
        job_sector
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
        await addNewJobSeeker({
          date_of_birth,
          nationality,
          location,
          high_qualification,
          years_of_experience,
          available,
        }).unwrap();
      } catch (error) {
        console.log(myError);
      }
    },
  });

  return {formik};
};

export default postSeeker;
