import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AddressCard = ({ address }) => {
	return (
			<React.Fragment>
				<div key={address.pk} className="card mt-3">
					<div className="card-body">
						<h5 className="card-title">
							{address.title}
						</h5>
						<h6 className="card-subtitle mb-2 text-muted">
							{address.country_name} / {address.state_name} / {address.city_name}
						</h6>
						<p className="card-text">
							{address.address}
						</p>
						<Link to={`/user/address/${address.pk}/edit`}
									className="card-link btn btn-light">Edit</Link>
						<Link to={`/user/address/${address.pk}/delete`}
									className="card-link btn btn-light">Remove</Link>
					</div>
				</div>
			</React.Fragment>
	);
};

AddressCard.propTypes = {
	address: PropTypes.object.isRequired,
};

export default AddressCard;
