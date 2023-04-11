import { selectCurrentUser_id } from "@/store/features/authSlice/jwtAuthSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const JobSeeker = () => {
  const user_id = useSelector(selectCurrentUser_id);
  return (
    <div>
      <Link href={`/dashboard/jobseeker/update/${user_id}/`}>
        {user_id && `JobSeeker ${user_id}`}
      </Link>
    </div>
  );
};

export default JobSeeker;
