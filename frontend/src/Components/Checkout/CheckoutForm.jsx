import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import YourBasket from "../Basket/YourBasket";
// import AddressSelection from "./AddressSelection";
import API from "../../api";
import { useAuth } from "../../Services/auth";

import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import CardSection from "../Stripe/CardSection";

const CheckoutForm = ({ baskets }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [order, setOrder] = useState(null);
	//const navigate = useNavigate();
	const { token } = useAuth();

	useEffect(() => {
		if (baskets[0]) {
			setOrder({
				basket: baskets[0].basket.id,
				agrement: false,
			});
		}

		console.log("order", order);

	}, [baskets]);

	const handleServerResponse = async (response) => {
		if (response.error) {
			// Show error from server on payment form
		} else if (response.requires_action) {
			// Use Stripe.js to handle the required card action
			const { error: errorAction, paymentIntent } =
					await stripe.handleCardAction(response.payment_intent_client_secret);

			if (errorAction) {
				// Show error from Stripe.js in payment form
			} else {
				// The card action has been handled
				// The PaymentIntent can be confirmed again on the server

				// const serverResponse = await fetch("/pay", {
				// 	method: "POST",
				// 	headers: { "Content-Type": "application/json" },
				// 	body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
				// });

				const serverResponse = await API.post(`/pay/`, { payment_intent_id: paymentIntent.id }, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				handleServerResponse(serverResponse);
			}
		} else {
			// Show success message
		}
	};

	const stripePaymentMethodHandler = async (result) => {
		if (result.error) {
			// Show error in payment form
		} else {
			// Otherwise send paymentMethod.id to your server (see Step 4)
			// const res = await fetch("/pay", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify({
			// 		payment_method_id: result.paymentMethod.id,
			// 	}),
			// });


			const paymentResponse = await API.post(`/pay/`, {
				payment_method_id: result.paymentMethod.id,
			}, {
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			// Handle server response (see Step 4)
			handleServerResponse(paymentResponse);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const createOrder = async (order) => {
			try {
				let response = await API.post(`/orders/`, order, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				setOrder(response.data);
				// navigate("/user/address", { replace: true });
			} catch (err) {
				console.error(err);
			}
		};

		createOrder(order);

		if (!stripe || !elements) {
			return;
		}

		const result = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
			billing_details: {
				name: "Jenny Rosen",
			},
		});

		stripePaymentMethodHandler(result);
	};

	const handleChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		setOrder({
			...order,
			[name]: value,
		});
		console.log(order);
	};

	return (
			<React.Fragment>
				<div className="container mt-5 mb-5">
					<div className="row g-5">
						<div className="col-md-5 col-lg-4 order-md-last">
							<YourBasket baskets={baskets}/>
						</div>
						<div className="col-md-7 col-lg-8">
							<form onSubmit={handleSubmit}
										className="needs-validation"
										noValidate="">

								<h4 className="mb-3">Payment</h4>

								<CardSection/>

								<button className="w-100 btn btn-dark btn-lg mt-3"
												type="submit">
									Continue to checkout
								</button>

							</form>

						</div>
					</div>
				</div>
			</React.Fragment>
	);
};

CheckoutForm.propTypes = {
	basket: PropTypes.array.isRequired,
};

export default CheckoutForm;
