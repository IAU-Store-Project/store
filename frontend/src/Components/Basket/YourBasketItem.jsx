import React from "react";
import PropTypes from "prop-types";

const YourBasketItem = ({ basket }) => {
	return (
			<React.Fragment>
				<li className="list-group-item d-flex justify-content-between lh-sm">
					<div>
						<h6 className="my-0">
							{basket?.product?.title}
						</h6>
						<small className="text-muted">
							x&nbsp;{basket?.quantity}
						</small>
					</div>
					<span className="text-muted">
						$ {basket?.total}
					</span>
				</li>
			</React.Fragment>
	);
};

YourBasketItem.propTypes = {
	basket: PropTypes.object.isRequired,
};

export default YourBasketItem;
