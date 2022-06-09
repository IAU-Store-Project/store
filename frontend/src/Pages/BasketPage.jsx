import React from "react";
import { useCart } from "../Hooks/useCart";
import BasketList from "../Components/Basket/BasketList";

const BasketPage = () => {
	const { cartItems } = useCart();

	return (
			<React.Fragment>
				<div className="container mt-5 mb-5">
					<div className="row">
						<div className="col">
									{cartItems.length > 0 ?
											<BasketList /> : (
											<h2 className="mt5 mb5 text-center">Basket is empty!</h2>
									)}
						</div>
					</div>
				</div>
			</React.Fragment>
	);
};

export default BasketPage;
