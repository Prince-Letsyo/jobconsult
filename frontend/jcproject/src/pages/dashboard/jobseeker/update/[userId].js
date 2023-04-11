import PutJobSeekerForm from "@/components/crud/JobSeeker/PutJobSeekerForm";
import Update from "@/components/crud/Update";
import FormContainer from "@/components/forms/FormContainer";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const update = () => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <Update
      children={
        <FormContainer title={"Job seeker Update"} tale={""} href={""}>
          <PutJobSeekerForm user_id={userId} />
        </FormContainer>
      }
    />
  );
};

export default update;
