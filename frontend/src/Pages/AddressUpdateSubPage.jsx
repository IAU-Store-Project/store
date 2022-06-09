import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api";
import { useAuth } from "../Services/auth";
import AddressForm from "../Components/User/Address/AddressForm";
import Spinner from "../Components/Common/Spinner";

const AddressUpdateSubPage = () => {
	const [address, setAddress] = useState({
		title: null,
	});
	const navigate = useNavigate();
	const { address_id } = useParams();
	const { token } = useAuth();

	useEffect(() => {
		let isMounted = true;
		let controller = new AbortController();

		const getAddress = async (address_id) => {
			try {
				const response = await API.get(`addresses/${address_id}`, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
					},
					signal: controller.signal,
				});
				isMounted && setAddress(response.data);
			} catch (err) {
				console.log(err);
			}
		};

		getAddress(address_id);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [address_id, token]);

	const handleSubmit = e => {
		e.preventDefault();

		const updateAddress = async (address_id) => {
			try {
				let response = await API.put(`addresses/${address_id}`, address, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				setAddress(response.data);
				navigate("/user/address", { replace: true });
			} catch (err) {
				console.error(err);
			}
		};

		updateAddress(address.pk);
	};

	const handleChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		setAddress({
			...address,
			[name]: value,
		});
	};

	if(! address.pk) {
		return <Spinner />;
	}

	return (
			<React.Fragment>
				<AddressForm address={address}
										 handleSubmit={handleSubmit}
										 handleChange={handleChange} />
			</React.Fragment>
	);
};

export default AddressUpdateSubPage;
