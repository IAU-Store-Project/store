import React from "react";

import Navbar from "./Navbar";
import CategoryNavbar from "./CategoryNavbar";

const Header = () => {
  return (
    <React.Fragment>
      <div className="container">
        <header>
          <Navbar />
          <CategoryNavbar />
        </header>
      </div>
    </React.Fragment>
  );
};

export default Header;
