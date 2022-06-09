import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../Services/auth";
import { useCart } from "../../Hooks/useCart";
import Logo from "./Logo";
import NavbarList from "./NavbarList";

const BasketForm = () => {
	const { token } = useAuth();
	const { itemCount } = useCart()

	return (
			<form className="d-flex">
				{token ? (
						<Link to="/user" className="btn btn-sm btn-light" type="button">
							Welcome <b>{localStorage.getItem("username")}</b>
						</Link>
				) : (
						<Link className="btn btn-primary" aria-current="page"
									to={`/signin`}>
							Sign in
						</Link>
				)}
				&nbsp;&nbsp;
				<Link to="/basket" className="btn btn-sm btn-light" type="button">
					<i className="fa-solid fa-bag-shopping"></i>&nbsp;<strong>{itemCount}</strong>
				</Link>
			</form>
	);
};

const Navbar = () => {
	const [collapse, setCollapse] = useState(false);

	return (
			<React.Fragment>
				<nav className="navbar navbar-expand-lg navbar-light">
					<div className="container-fluid">
						<Link className="navbar-brand active" to={'/'}>
							<Logo/>
							&nbsp;
							<span><b>IAU</b> Store</span>
						</Link>
						<button
								className={collapse ? `navbar-toggler collapsed` : `navbar-toggler`}
								onClick={() => (setCollapse(!collapse))}
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarSupportedContent"
								aria-controls="navbarSupportedContent"
								aria-expanded="false"
								aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>&nbsp;Menu
						</button>
						<div className={collapse ? `collapse navbar-collapse show` : `collapse navbar-collapse`}
								 id="navbarSupportedContent">
							<NavbarList/>
							<BasketForm/>
						</div>
					</div>
				</nav>
			</React.Fragment>
	);
};

export default Navbar;
