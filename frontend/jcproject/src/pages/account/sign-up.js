import RegisterJobSeekerForm from "@/components/JobSeeker/RegisterJobSeekerForm";
import RegisterCompanyRepForm from "@/components/company/RegisterCompanyRepForm";
import FormContainer from "@/components/forms/FormContainer";
import { useState } from "react";

const SignUp = () => {
  const [userFormType, setUserFormType] = useState("job-seeker");
  const isJobSeeker = userFormType === "job-seeker";
  return (
    <FormContainer title={"Sign Up"}>
      <div>
        <button
          className={` btn btn-${!isJobSeeker ? "outline-" : ""}primary btn-sm`}
          onClick={() => setUserFormType("job-seeker")}
        >
          Job Seeker
        </button>
        <button
          className={`btn btn-${isJobSeeker ? "outline-" : ""}primary btn-sm`}
          onClick={() => setUserFormType("compay-rep")}
        >
          Company Rep
        </button>
      </div>
      {isJobSeeker ? <RegisterJobSeekerForm /> : <RegisterCompanyRepForm />}
    </FormContainer>
  );
};

export default SignUp;
