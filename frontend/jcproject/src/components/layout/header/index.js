import { useEffect, useState } from "react";
import MyNavbar from "./Navbar";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { useCreateNewAccessTokenMutation } from "@/store/features/authSlice";
import { useGetUserByUserIdQuery } from "@/store/features/userSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/store/features/authSlice/jwtAuthSlice";
import { selectAllSectors, selectSectorById } from "@/store/features/sectorSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [createNewAccessToken, { data: tokenData }] =
    useCreateNewAccessTokenMutation();
  const [userId, setUserId] = useState();
  const { data, isSuccess: isSuccessUserData } = useGetUserByUserIdQuery(
    userId ?? skipToken
  );

  useEffect(() => {
    const refresh = localStorage.getItem("CONSULT_KEY");
    if (refresh) {
      const { user_id } = jwt_decode(refresh);
      setUserId(user_id);
      createNewAccessToken({ refresh })
        .unwrap()
        .then((refreshPayload) => {
          dispatch(
            setCredentials({
              user_id,
              user_type: data?.data.user_type,
              tokens: { ...refreshPayload.data, refresh },
            })
          );
        });
    }
    return () => {};
  }, [userId, isSuccessUserData]);
  return (
    <>
      <MyNavbar />
    </>
  );
};

export default Header;
