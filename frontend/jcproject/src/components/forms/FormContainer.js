const FormContainer = ({ title, children }) => {
  return (
    <div className="form-wrap-container">
      <div className="form-wrap-title">
        <h3 className= "text-primary">{title}</h3>
      </div>
      <div className="form-wrap">{children}</div>
    </div>
  );
};

export default FormContainer;
