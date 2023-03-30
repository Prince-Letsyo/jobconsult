import Link from "next/link";

const FormContainer = ({ title, tale,href,  children }) => {
  return (
    <div className="form-wrap-container">
      <div className="form-wrap-title">
        <h3 className="text-primary">{title}</h3>
      </div>
      <div className="form-wrap">{children}</div>
      {tale != "" && (
        <div className="form-wrap-tale">
          <Link href={href}>
            <p className="text-primary">{tale}</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FormContainer;
