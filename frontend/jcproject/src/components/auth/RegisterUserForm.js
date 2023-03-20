import createUser from "@/hooks/authHooks/registerUser";

const RegisterUserForm = () => {
  const formik = createUser();
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlfor="email">Email:</label>
      <input
        id="email"
        className="email"
        name="email"
        type="email"
        {...formik.getFieldProps("email")}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="formError">{formik.errors.email}</div>
      ) : null}
      <label htmlfor="firstName">First Name</label>
      <input
        id="firstName"
        className="firstName"
        name="firstName"
        type="text"
        {...formik.getFieldProps("first_name")}
      />
      {formik.touched.first_name && formik.errors.first_name ? (
        <div className="formError">{formik.errors.first_name}</div>
      ) : null}
      <label htmlfor="lastName">Last Name:</label>
      <input
        id="lastName"
        className="lastName"
        name="lastName"
        type="text"
        {...formik.getFieldProps("last_name")}
      />
      {formik.touched.last_name && formik.errors.last_name ? (
        <div className="formError">{formik.errors.last_name}</div>
      ) : null}
      <label htmlfor="middleName">Middle Name: </label>
      <input
        id="middleName"
        className="middleName"
        name="middleName"
        type="text"
        {...formik.getFieldProps("middle_name")}
      />
      {formik.touched.middle_name && formik.errors.middle_name ? (
        <div className="formError">{formik.errors.middle_name}</div>
      ) : null}
      <label htmlfor="passwordOne">Password:</label>
      <input
        id="passwordOne"
        className="passwordOne"
        name="passwordOne"
        type="password"
        {...formik.getFieldProps("passwordOne")}
      />
      {formik.touched.passwordOne && formik.errors.passwordOne ? (
        <div className="formError">{formik.errors.passwordOne}</div>
      ) : null}
      <label htmlfor="passwordTwo">Confirm Password:</label>
      <input
        id="passwordTwo"
        className="passwordTwo"
        name="passwordTwo"
        type="password"
        {...formik.getFieldProps("passwordTwo")}
      />
      {formik.touched.passwordTwo && formik.errors.passwordTwo ? (
        <div className="formError">{formik.errors.passwordTwo}</div>
      ) : null}
      <label htmlfor="gender">Gender:</label>
      <select
        id="gender"
        className="gender"
        name="gender"
        {...formik.getFieldProps("gender")}
      >
        <option value="">......select......</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      {formik.touched.gender && formik.errors.gender ? (
        <div className="formError">{formik.errors.gender}</div>
      ) : null}
      <label htmlfor="phone_number">Phone Number:</label>
      <input
        id="phone_number"
        className="phone_number"
        name="phone_number"
        type="text"
        {...formik.getFieldProps("phone_number")}
      />
      {formik.touched.phone_number && formik.errors.phone_number ? (
        <div className="formError">{formik.errors.phone_number}</div>
      ) : null}
<button type="submit">Submit</button>
    </form>
  );
};

export default RegisterUserForm;
