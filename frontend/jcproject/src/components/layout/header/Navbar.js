import Link from "next/link";
import React from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
const MyNavbar = () => {
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
            <div className="auth-d">
              <Link href="/account/log-in/">Login</Link>
              <Link href="/account/sign-up/">Sign up</Link>
            </div>
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
