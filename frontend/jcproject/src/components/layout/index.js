import React from "react";
import Footer from "./Footer";
import Header from "./header/index";

const Layout = ({ children }) => {
  return (
    <div className="main-container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
