import React from "react";
import PropTypes from "prop-types";
import { useCart } from "../../Hooks/useCart";

const ProductCartBtn = ({ product }) => {
	const { addProduct, removeProduct, cartItems } = useCart();

	const isInCart = product => {
		return !!cartItems.find(item => item.id === product.id);
	};

	if (!product) {
		return <React.Fragment></React.Fragment>;
	}

	return (
			<React.Fragment>
				{isInCart(product) ? (
						<button onClick={() => removeProduct(product)}
										className={`btn btn-dark btn-block`}>
							<i className="fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;
							<strong>
								Added to Cart
							</strong>
						</button>
				) : (
						<button onClick={() => addProduct(product)}
										className={`btn btn-danger btn-block`}>
							<i className="fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;
							<strong>
								{product.price}&nbsp;{product.currency}
							</strong>
						</button>
				)}
			</React.Fragment>
	);
};

ProductCartBtn.propTypes = {
	product: PropTypes.object.isRequired,
};

export default ProductCartBtn;
