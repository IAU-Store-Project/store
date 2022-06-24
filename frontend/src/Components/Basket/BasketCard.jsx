import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../../Hooks/useCart";

const BasketCard = ({ product }) => {
	const { increase, decrease, removeProduct } = useCart();
	const [cart, setCart] = useState();

	useEffect(() => {
		setCart(product);
	}, [product])

	if(!cart) {
		return (
				<tr></tr>
		);
	}

	return (
			<tr>
				<td>{cart.title}</td>
				<td>{cart.price}</td>
				<td>{cart.quantity}</td>
				<td>
					<button onClick={() => increase(cart)}
									className="btn btn-sm btn-dark text-bolder">
						<i className="fas fa-plus-circle"></i>
					</button>
					&nbsp;
					<button onClick={() => decrease(cart)}
									className="btn btn-sm btn-secondary text-bolder">
						<i className="fas fa-minus-circle"></i>
					</button>
					&nbsp;
					<button onClick={() => removeProduct(cart)}
									className="btn btn-sm btn-default text-bolder">
						<i className="fas fa-trash"></i>
					</button>
				</td>
			</tr>
	);
};

BasketCard.propTypes = {
	product: PropTypes.object.isRequired,
};

export default BasketCard;
