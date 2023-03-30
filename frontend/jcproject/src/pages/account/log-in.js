import LoginForm from "@/components/auth/LoginForm";
import FormContainer from "@/components/forms/FormContainer";

const LogIn = () => {
  return (
    <FormContainer
    title={"Log In"}
     >
      <LoginForm />
    </FormContainer>
  );
};

export default LogIn;
