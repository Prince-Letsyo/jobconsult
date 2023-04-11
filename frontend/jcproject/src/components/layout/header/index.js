import { useEffect, useState } from "react";
import MyNavbar from "./Navbar";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { useCreateNewAccessTokenMutation } from "@/store/features/authSlice";
import { useGetUserByUserIdQuery } from "@/store/features/userSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/authSlice/jwtAuthSlice";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [createNewAccessToken, { data: tokenData }] =
    useCreateNewAccessTokenMutation();
  const [userId, setUserId] = useState();
  const { data } = useGetUserByUserIdQuery(userId ?? skipToken);

  useEffect(() => {
    const refresh = localStorage.getItem("CONSULT_KEY");
    if (refresh) {
      const { user_id } = jwt_decode(refresh);
      createNewAccessToken({ refresh })
        .unwrap()
        .then((refreshPayload) => {
          setUserId(user_id);          
          dispatch(
            setCredentials({
              user_id,
              user_type: data?.user_type,
              tokens: { ...refreshPayload.data, refresh },
            })
          );
        });
    }
    return () => {};
  }, [userId,data]);
  return (
    <>
      <MyNavbar />
    </>
  );
};

export default Header;
