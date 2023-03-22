const myField = ({ field, fieldName, placeholder, classes }) => {
  return (
    <div>
      <label htmlfor={fieldName}>Email:</label>
      <input
        type={fieldName}
        placeholder={placeholder}
        id={fieldName}
        className={classes}
        {...field}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default myField;
