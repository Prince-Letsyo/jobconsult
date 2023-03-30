import RequestPasswordResetForm from "@/components/auth/RequestPasswordResetForm";
import FormContainer from "@/components/forms/FormContainer";
import React from "react";

const ResetPassword = () => {
  return (
    <FormContainer title={"Password reset"} tale={""}>
      <RequestPasswordResetForm />
    </FormContainer>
  );
};

export default ResetPassword;
