import LoginForm from "@/components/crud/auth/LoginForm";
import FormContainer from "@/components/forms/FormContainer";

const LogIn = () => {
  return (
    <FormContainer title={"Log In"} tale={"Forgot password?"} href={"/account/reset_password/"}>
      <LoginForm />
    </FormContainer>
  );
};

export default LogIn;
