import { selectCurrentUser_id } from "@/store/features/authSlice/jwtAuthSlice";
import {
  selectCompanyInfoById,
  useGetCompanyInfosQuery,
} from "@/store/features/companyInfoSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Company = () => {
  const [data, setData] = useState([]);
  const user_id = useSelector(selectCurrentUser_id);
  
  const {
    data: companyInfoData,
    isSuccess: companyInfoIsSuccess,
    isLoading: isLoadingCompanyInfo,
  } = useGetCompanyInfosQuery(user_id ?? skipToken);
  
  useEffect(() => {
    companyInfoData !== undefined && setData(companyInfoData.data);
    return () => {};
  }, [companyInfoData]);

  return <div>{JSON.stringify(data)}</div>;
};

export default Company;
