import React, { useState, useEffect, Fragment } from "react";

import API from "../api";
import OrderCard from "../Components/Order/OrderCard";
import { useAuth } from "../Services/auth";
import Spinner from "../Components/Common/Spinner";

const OrderPage = () => {
	const [spin, setSpin] = useState(true);
	const [orders, setOrders] = useState(true);
	const { token } = useAuth();

	useEffect(() => {
		let isMounted = true;
		let controller = new AbortController();

		const getOrders = async () => {
			try {
				const response = await API.get(`orders`, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
					},
					signal: controller.signal,
				});
				isMounted && setOrders(response.data.results);
			} catch (err) {
				console.log(err);
			} finally {
				setSpin(false);
			}
		};

		getOrders();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [token]);

	if (spin) {
		return <Spinner/>;
	}

	return (
			<Fragment>
				{orders && orders.map(order => <OrderCard key={`ord-${order.id}`} order={order}/>)}
			</Fragment>
	);
};

export default OrderPage;
