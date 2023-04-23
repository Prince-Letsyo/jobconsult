import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

const Textarea = ({ label,placeholder, name, ...rest }) => {
  return (
    <div className={"input-container"}>
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" placeholder={placeholder} id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Textarea