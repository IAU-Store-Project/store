import React from "react";
import { Outlet } from "react-router-dom";

import UserMenu from "./../Components/Account/UserMenu";

const AccountPage = () => {
	return (
			<React.Fragment>
				<div className="container mt-4 mb-5">
					<div className="row">
						<div className="col-3">
							<div className="card">
								<UserMenu/>
							</div>
						</div>
						<div className="col-9">
							<Outlet />
						</div>
					</div>
				</div>
			</React.Fragment>
	);
};

export default AccountPage;
