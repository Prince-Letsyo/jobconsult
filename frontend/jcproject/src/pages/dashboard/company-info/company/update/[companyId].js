import Update from "@/components/crud/Update";
import PutCompanyInfoForm from "@/components/crud/company/PutCompanyInfoForm";
import FormContainer from "@/components/forms/FormContainer";
import { useRouter } from "next/router";
import React from "react";

const update = () => {
  const router = useRouter();
  const { companyId } = router.query;
  return (
    <Update>
      <FormContainer title={"Company Update"} tale={""} href={""}>
        <PutCompanyInfoForm companyId={companyId} />
      </FormContainer>
    </Update>
  );
};

export default update;
