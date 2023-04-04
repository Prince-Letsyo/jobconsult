import { selectCurrentUser_id } from "@/store/features/authSlice/jwtAuthSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const JobSeeker = () => {
  const router = useRouter();
  const user_id = useSelector(selectCurrentUser_id);

  useEffect(() => {
    !user_id && router.push("/account/log-in");
    return () => {};
  }, []);
  return <div>{user_id && `JobSeeker ${user_id}`}</div>;
};

export default JobSeeker;
