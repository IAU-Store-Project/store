import React from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo";

const Footer = () => {
	return (
			<React.Fragment>
				<div className="container">
					<footer className="pt-4 my-md-5 pt-md-5 border-top">
						<div className="row">
							<div className="col-12 col-md d-block">
								<Logo />&nbsp;&nbsp;

								<div className="clearfix">&nbsp;</div>
							</div>
							<div className="col-6 col-md">
								<h5>Store</h5>
								<ul className="list-unstyled text-small">
									<li className="mb-1">
										<Link className="link-secondary text-decoration-none"
													to="/user">
											Account
										</Link>
									</li>
									<li className="mb-1">
										<Link className="link-secondary text-decoration-none"
													to="/user/orders">
											Orders
										</Link>
									</li>
									<li className="mb-1">
										<Link className="link-secondary text-decoration-none"
													to="/help">
											Help
										</Link>
									</li>
									<li className="mb-1">
										<Link className="link-secondary text-decoration-none"
													to="/about">
											About
										</Link>
									</li>
								</ul>
							</div>
							<div className="col-6 col-md">
								<h5>Developers</h5>
								<ul className="list-unstyled text-small">
									<li className="mb-1">
										<a className="link-secondary text-decoration-none"
													href="/graphql" target="_blank">
											GraphQL API
										</a>
									</li>
								</ul>
							</div>
							<div className="col-12 col-md d-block">
								<small className="mb-3 ml-2 text-muted mt-3 visible-md">
									&copy; 2022 &nbsp; IAU Store
								</small>
								<div className="clearfix">&nbsp;</div>
							</div>
						</div>
					</footer>
				</div>
			</React.Fragment>
	);
};

export default Footer;
