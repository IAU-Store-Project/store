import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";
import { useAuth } from "../Services/auth";
import AddressForm from "../Components/User/Address/AddressForm";

const AddressCreateSubPage = () => {
	const [address, setAddress] = useState({
		title: null,
		country: null,
		state: null,
		city: null,
	});
	const navigate = useNavigate();
	const { token } = useAuth();

	const handleSubmit = e => {
		e.preventDefault();

		const createAddress = async () => {
			try {
				let response = await API.post(`/addresses/`, address, {
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

		createAddress();
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

	return (
			<React.Fragment>
				<AddressForm address={address}
										 handleSubmit={handleSubmit}
										 handleChange={handleChange} />
			</React.Fragment>
	);
};

export default AddressCreateSubPage;
