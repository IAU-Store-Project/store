import React from "react";
import PropTypes from "prop-types";

import { useCart } from "../../Hooks/useCart";
import YourBasketItem from "./YourBasketItem";

const YourBasket = ({ baskets }) => {
	const { itemCount } = useCart();

	return (
			<React.Fragment>
				<h4 className="d-flex justify-content-between align-items-center mb-3">
					<span className="text-primary">
						Your basket
					</span>
					<span className="badge bg-primary rounded-pill">
						{itemCount}
					</span>
				</h4>
				<ul className="list-group mb-3">
					{baskets.map(basket =>
							<YourBasketItem key={`${basket.id}`} basket={basket}/>,
					)}
					<li key={`a-0`}
							className="list-group-item d-flex justify-content-between bg-light">
						<div className="text-success">
							<h6 className="my-0">Promo code</h6>
							<small>-</small>
						</div>
						<span className="text-success">−$0</span>
					</li>
					<li key={`a-1`}
							className="list-group-item d-flex justify-content-between">
						<span>Total (USD)</span>
						<strong>
							$&nbsp;{baskets[0]?.basket?.total}
						</strong>
					</li>
				</ul>
				<form className="card p-2">
					<div className="input-group">
						<input type="text"
									 className="form-control"
									 placeholder="Promo code"/>
						<button type="submit"
										className="btn btn-secondary">
							Redeem
						</button>
					</div>
				</form>
			</React.Fragment>
	);
};

YourBasket.propTypes = {
	baskets: PropTypes.array.isRequired,
};

export default YourBasket;
