import { Field, useField } from "formik";
const GenericFormFields = ({ labelName, label, wrapper, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <Field name={props.name}>
      <div className={wrapper}>
        <label htmlFor={label}>
          {labelName}
          <input {...field} {...props} />
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </Field>
  );
};

export default GenericFormFields;
