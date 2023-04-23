import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

const Select = ({ label, placeholder, name, options, ...rest }) => {
  return (
    <div className={"input-container"}>
      <label htmlFor={name}>{label}</label>
      <Field
        as="select"
        placeholder={placeholder}
        id={name}
        name={name}
        {...rest}
      >
        {options.map(({ key, value }, index) => (
          <option key={index} value={key}>
            {value}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Select;
