import React from "react";
import { useCart } from "../../Hooks/useCart";
import BasketCard from "./BasketCard";

const BasketList = () => {
	const { total, cartItems, itemCount, clearCart, checkout } = useCart();

	return (
			<React.Fragment>
						<table className="table table-hover table-striped">
							<thead>
							<tr>
								<th scope="col">Product Name</th>
								<th scope="col">Price</th>
								<th scope="col">Quantity</th>
								<th scope="col">&nbsp;</th>
							</tr>
							</thead>
							<tbody>
							{cartItems.map(product => <BasketCard
									key={`cart-${product.id}`}
									product={{...product}} />
							)}
							<tr>
								<td>
								</td>
								<td>{total}</td>
								<td>{itemCount}</td>
								<td>-</td>
							</tr>
							</tbody>
						</table>
						<button className="btn btn-danger" onClick={() => clearCart()}>Clean</button>&nbsp;
						<button className="btn btn-primary" onClick={() => checkout()}>Checkout &raquo;</button>
			</React.Fragment>
	);
};

export default BasketList;
