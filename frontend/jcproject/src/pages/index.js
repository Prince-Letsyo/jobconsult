import RegisterJobForm from "@/components/Job/RegisterJobForm";
import RegisterJobSeekerForm from "@/components/JobSeeker/RegisterJobSeekerForm";
import LoginForm from "@/components/auth/LoginForm";
import RequestPasswordResetForm from "@/components/auth/RequestPasswordResetForm";
import PutCompanyRepForm from "@/components/company/PutCompanyRepForm";
import RegisterCompanyInfoForm from "@/components/company/RegisterCompanyInfoForm";
import RegisterCompanyRepForm from "@/components/company/RegisterCompanyRepForm";

export default function Home() {
  return (
    <>
      <RegisterJobForm />
    </>
  );
}
