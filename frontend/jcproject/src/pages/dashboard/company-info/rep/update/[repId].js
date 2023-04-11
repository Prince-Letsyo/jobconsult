import Update from "@/components/crud/Update";
import PutCompanyRepForm from "@/components/crud/company/PutCompanyRepForm";
import FormContainer from "@/components/forms/FormContainer";
import { useRouter } from "next/router";

const update = () => {
  const router = useRouter();
  const { repId } = router.query;

  return (
    <Update
      children={
        <FormContainer title={"Employer Update"} tale={""} href={""}>
          <PutCompanyRepForm repId={repId} />
        </FormContainer>
      }
    />
  );
};

export default update;
