import { selectCurrentUser_id } from "@/store/features/authSlice/jwtAuthSlice";
import Link from "next/link";
import React from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
const MyNavbar = () => {
  const user_id = useSelector(selectCurrentUser_id);
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
            ): <button type="button" onClick={()=>console.log("log out")}>Log out</button>}
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
