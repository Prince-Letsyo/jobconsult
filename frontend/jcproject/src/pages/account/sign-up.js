import RegisterJobSeekerForm from "@/components/JobSeeker/RegisterJobSeekerForm";
import RegisterCompanyRepForm from "@/components/company/RegisterCompanyRepForm";
import React, { useState } from "react";

const SignUp = () => {
  const [userFormType, setUserFormType] = useState("compay-rep");
  const isJobSeeker = userFormType === "job-seeker";
  return (
    <>
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
    </>
  );
};

export default SignUp;
