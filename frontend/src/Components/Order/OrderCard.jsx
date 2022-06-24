import React from "react";
import PropTypes from "prop-types";

const OrderCard = ({ order }) => {

	React.useEffect(() => {

	}, []);

	return (
			<React.Fragment>
				<div className="card mb-4">
					<div className="card-body">
						<h5 className="card-title">
							<span className="text-muted">
								Order #</span>{order.id}
						</h5>
						<h6 className="card-subtitle mb-2 text-right text-end w-100">
							{order.status_text}
						</h6>
						<p className="card-text">
							{order.payment?.currency} {order.amount}
						</p>
						<a href="/" className="card-link">Review</a>
					</div>
				</div>
			</React.Fragment>
	);
};

OrderCard.propTypes = {
	order: PropTypes.object.isRequired,
};

export default OrderCard;
