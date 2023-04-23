import { useLogoutUserMutation } from "@/store/features/authSlice";
import {
  logOut,
  selectCurrentUser_id,
  selectCurrentUser_type,
  selectTokens,
} from "@/store/features/authSlice/jwtAuthSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";

const MyNavbar = () => {
  const user_id = useSelector(selectCurrentUser_id);
  const user_type = useSelector(selectCurrentUser_type);
  const tokens = useSelector(selectTokens);
  const [profileLink, setProfileLink] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUser, { isSuccess }] = useLogoutUserMutation(
    tokens ?? skipToken
  );
  useEffect(() => {
    if (user_type == "seeker") setProfileLink("/dashboard/jobseeker/");
    else if (user_type == "company-rep")
      setProfileLink("/dashboard/company-info/rep/");
    else setProfileLink("/");
    return () => {};
  }, [user_id, user_type, isSuccess]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="container-fluid">
          <Link href="/">
            <Navbar.Brand>
              <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              Job consult
            </Navbar.Brand>
          </Link>
          <div className="auth-project">
            {!user_id ? (
              <div className="auth-d">
                <Link href="/account/log-in/">Login</Link>
                <Link href="/account/sign-up/">Sign up</Link>
              </div>
            ) : (
              <div>
                <Link href={profileLink}>Profile</Link>
                <button
                  type="button"
                  onClick={() => {
                    logoutUser({ refresh: tokens.refresh })
                      .unwrap()
                      .then((payload) => {
                        router.push("/");
                        dispatch(logOut());
                      });
                  }}
                >
                  Log out
                </button>
              </div>
            )}
            <a
              href="https://github.com/Prince-Letsyo/jobconsult"
              target="_blank"
            >
              Github
            </a>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
