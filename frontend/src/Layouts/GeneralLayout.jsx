import React from "react";
import Header from "./../Components/Common/Header";
import Footer from "./../Components/Common/Footer";

const GeneralLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default GeneralLayout;
