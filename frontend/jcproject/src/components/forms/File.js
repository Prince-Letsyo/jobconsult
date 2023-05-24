import React, { useRef } from "react";
import TextError from "./TextError";
import { ErrorMessage, useField } from "formik";
import Preview from "./Preview";

const File = ({ label, ...rest }) => {
  const fileRef = useRef(null);
  const [field, form, setFieldValue] = useField(rest);
  const { setValue } = setFieldValue;
  const { value, name } = field;
  return (
    <div className="input-container">
      <div>
        <label htmlFor={name}>Company image:</label>
        <input
          ref={fileRef}
          hidden
          type="file"
          id={name}
          name={name}
          onChange={(e) => {
            setValue(e.currentTarget.files[0]);
          }}
        />
        <ErrorMessage name={name} component={TextError} />
      </div>
      <div className={"d-flex"}>
        {value && <Preview file={value} />}
        <p
          onClick={() => {
            fileRef.current.click();
          }}
          className="upload-btn btn btn-outline-primary"
        >
          Upload
        </p>
      </div>
    </div>
  );
};

export default File;
