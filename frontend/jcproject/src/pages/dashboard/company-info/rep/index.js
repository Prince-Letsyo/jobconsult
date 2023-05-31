import RegisterJobForm from "@/components/crud/Job/RegisterJobForm";
import RegisterCompanyInfoForm from "@/components/crud/company/RegisterCompanyInfoForm";
import FormContainer from "@/components/forms/FormContainer";
import { selectCurrentUser_id } from "@/store/features/authSlice/jwtAuthSlice";
import { useGetCompanyInfoByCompanyInfoIdQuery } from "@/store/features/companyInfoSlice";
import { useCompanyJobsQuery } from "@/store/features/jobsSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Rep = () => {
  const router = useRouter();
  const user_id = useSelector(selectCurrentUser_id);

  const {
    data: companyInfoData,
    isSuccess: isSuccessCompanyInfo,
    isLoading: isLoadingCompanyInfo,
  } = useGetCompanyInfoByCompanyInfoIdQuery(user_id ?? skipToken);
  const {
    data: companyJobsData,
    isSuccess: isSuccessCompanyJobs,
    isLoading: isLoadingCompanyJobs,
  } = useCompanyJobsQuery();

  useEffect(() => {
    return () => {};
  }, [user_id, companyInfoData, companyJobsData]);

  return !isLoadingCompanyInfo && !isLoadingCompanyJobs ? (
    isSuccessCompanyInfo && isSuccessCompanyJobs ? (
      <div>
        <Link href={`/dashboard/company-info/rep/update/${user_id}/`}>
          {user_id && `Company Rep ${user_id}`}
        </Link>
        <div>
          {isSuccessCompanyInfo ? (
            <div>
              {companyInfoData.data.length != 0 ? (
                <div>
                  <Link href={`/dashboard/company-info/company/`}>
                    <div> {companyInfoData.data.company_name}</div>
                  </Link>
                  <hr />
                  <div>
                    {companyJobsData.data.length != 0 ? (
                      <div>gfdgggbfg</div>
                    ) : (
                      <FormContainer
                        title={"Job registration"}
                        tale={""}
                        href={""}
                      >
                        <RegisterJobForm
                          companyRepId={user_id}
                          company={{ ...companyInfoData.data }}
                        />
                      </FormContainer>
                    )}
                  </div>
                </div>
              ) : (
                <div>Error</div>
              )}
            </div>
          ) : (
            <p>loading....</p>
          )}
        </div>
      </div>
    ) : (
      <div>
        <FormContainer title={"Company registration"} tale={""} href={""}>
          <RegisterCompanyInfoForm repId={user_id} />
        </FormContainer>
      </div>
    )
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Rep;
