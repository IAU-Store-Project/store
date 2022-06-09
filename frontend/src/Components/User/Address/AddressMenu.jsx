import React from "react";
import { Link } from "react-router-dom";

const AddressMenu = () => {
	return (
			<React.Fragment>
				<div className="row">
					<div className="col">
						<Link to={`/user/address/new`} className="btn btn-light">
							<i className="fas fa-plus-circle"></i>&nbsp;Add Address
						</Link>
					</div>
				</div>
			</React.Fragment>
	);
};

export default AddressMenu;
