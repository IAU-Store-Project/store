import React from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo";

import NavbarList from "./NavbarList";

const BasketForm = () => {
  return (
    <form className="d-flex">
      <Link to="/user" className="btn btn-default" type="button">
        resul
      </Link>
      <Link to="/basket" className="btn btn-default" type="button">
        <i className="fa-solid fa-bag-shopping"></i> <strong>0</strong>
      </Link>
    </form>
  );
};

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <Logo />
            &nbsp;
            <span>Store</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <NavbarList />
            <BasketForm />
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
