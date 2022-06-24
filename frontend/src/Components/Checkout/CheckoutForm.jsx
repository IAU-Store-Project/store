import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import YourBasket from "../Basket/YourBasket";
// import AddressSelection from "./AddressSelection";
import API from "../../api";
import { useAuth } from "../../Services/auth";

import {
	CardElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import CardSection from "../Stripe/CardSection";
import { useCart } from "../../Hooks/useCart";


const CheckoutForm = ({ baskets }) => {
	const [order, setOrder] = useState(null);
	const [error, setError] = useState(null);
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const { token } = useAuth();
	const { clearCart } = useCart();

	useEffect(() => {
		if (baskets[0]) {
			setOrder({
				basket: baskets[0].basket.id,
				agrement: false,
			});
		}
	}, [baskets]);

	const handleServerResponse = async (response) => {
		if (response.error) {
			setError(response.error);
		} else if (response.requires_action) {
			const {
				error: errorAction,
				paymentIntent,
			} = await stripe.handleCardAction(response.payment_intent_client_secret);

			if (errorAction) {
				console.log("errorAction", errorAction);
			} else {
				const serverResponse = await API.post(`/pay/`,
						{
							payment_intent_id: paymentIntent.id,
						},
						{
							headers: {
								"Authorization": `Bearer ${token}`,
								"Content-Type": "application/json",
							},
						});
				handleServerResponse(serverResponse);
			}
		} else {
			if (response.success == true) {
				clearCart();
				navigate("/user/orders", { replace: true });
			}
		}
	};

	const stripePaymentMethodHandler = async (result) => {
		if (result.error) {
			setError(result.error.message);
		} else {
			const paymentResponse = await API.post(`/pay/`, {
				payment_method_id: result.paymentMethod.id,
			}, {
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			handleServerResponse(paymentResponse.data);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}

		setError(null);

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
							{error && <div className="m-2">
								<p className="fw-bold text-danger">{error}</p>
							</div>}
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
