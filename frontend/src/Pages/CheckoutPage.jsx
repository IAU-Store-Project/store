import React, { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../Services/auth";
import Spinner from "../Components/Common/Spinner";
import { useCart } from "../Hooks/useCart";
import CheckoutForm from "../Components/Checkout/CheckoutForm";

const CheckoutPage = () => {
	const [basket, setBasket] = useState();
	const [spin, setSpin] = useState(true);
	const { token } = useAuth();
	const { cartItems } = useCart();

	useEffect(() => {
		let isMounted = true;
		let controller = new AbortController();

		const updateBasket = async () => {
			try {
				const response = await API.post(`checkout/`, cartItems,{
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
					},
					signal: controller.signal,
				});
				isMounted && setBasket(response.data);
			} catch (err) {
				console.log(err);
			} finally {
				setSpin(false);
			}
		}

		updateBasket();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [token, cartItems])

	if(spin) {
		return <Spinner />;
	}

	return (
			<React.Fragment>
				<CheckoutForm
						baskets={basket}
				/>
			</React.Fragment>
	);
};

export default CheckoutPage;
