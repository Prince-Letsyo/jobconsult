import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

const Input = ({ label,placeholder, name, ...rest }) => {
  return (
    <div className={"input-container"}>
      <label htmlFor={name}>{label}</label>
      <Field placeholder={placeholder} id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
