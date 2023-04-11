import RegisterCompanyInfoForm from "@/components/crud/company/RegisterCompanyInfoForm";
import FormContainer from "@/components/forms/FormContainer";
import { selectCurrentUser_id } from "@/store/features/authSlice/jwtAuthSlice";
import { useGetCompanyInfosQuery } from "@/store/features/companyInfoSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Rep = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const user_id = useSelector(selectCurrentUser_id);
  const {
    data: companyInfoData,
    isSuccess: companyInfoIsSuccess,
    isLoading: isLoadingCompanyInfo,
  } = useGetCompanyInfosQuery(user_id ?? skipToken);

  useEffect(() => {
    console.log(companyInfoData);
    companyInfoData !== undefined && setData(companyInfoData.data);
    return () => {};
  }, [companyInfoData]);

  return (
    <div>
      <Link href={`/dashboard/company-info/rep/update/${user_id}/`}>
        {user_id && `Company Rep ${user_id}`}
      </Link>
      <div>
        {companyInfoIsSuccess ? (
          <div>
            {data.length != 0 ? (
              <div>
                {data.map((item, index) => (
                  <div key={index}>{JSON.stringify(item)}</div>
                ))}
              </div>
            ) : (
              <div>
                <FormContainer
                  title={"Company registration"}
                  tale={""}
                  href={""}
                >
                  <RegisterCompanyInfoForm repId={user_id} />
                </FormContainer>
              </div>
            )}
          </div>
        ) : (
          <p>loading....</p>
        )}
      </div>
    </div>
  );
};

export default Rep;
