import { selectCurrentUser_id } from "@/store/features/authSlice/jwtAuthSlice";
import {
  selectAllCompanyInfos,
  selectCompanyInfoById,
  useGetCompanyInfoByCompanyInfoIdQuery,
} from "@/store/features/companyInfoSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Company = () => {
  const user_id = useSelector(selectCurrentUser_id);

  const {
    data: companyInfoData,
    isSuccess: isSuccessCompanyInfo,
    isLoading: isLoadingCompanyInfo,
  } = useGetCompanyInfoByCompanyInfoIdQuery(user_id ?? skipToken);

  useEffect(() => {
    return () => {};
  }, [companyInfoData]);

  return !isLoadingCompanyInfo ? (
    isSuccessCompanyInfo ? (
      <div>
           {  
           <div>
             <Link  href={`/dashboard/company-info/company/update/${user_id}`}>
               {companyInfoData.data.representative.user.first_name}
            </Link>
             <img width={500} src={companyInfoData.data.image} />
           </div>
         }
      
      </div>
    ) : (
      <div>Error</div>
    )
  ) : (
    <div>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Company;
