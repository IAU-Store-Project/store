import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../Services/auth";
import API from "../api";
import AddressCard from "../Components/User/Address/AddressCard";
import Spinner from "../Components/Common/Spinner";

const AddressDeleteSubPage = () => {
	const [address, setAddress] = useState();
	const { address_id } = useParams();
	const { token } = useAuth();
	const navigate = useNavigate();

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

	const deleteAddress = async () => {
		try {
			const response = await API.delete(`addresses/${address.pk}`, {
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
				},
			});
			console.log(response.data)
			navigate("/user/address", { replace: true });
		} catch (err) {
			console.log(err);
		}
	};

	if(! address) {
		return <Spinner />;
	}

	return (
			<React.Fragment>
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Delete Address</h5>
						<p className="card-text">
							Are you sure you want to delete your address?
						</p>
						<button onClick={deleteAddress} className="btn btn-danger">
							Confirm
						</button>
						&nbsp;
						<Link to={`/user/address/`} className="btn btn-light">
							Cancel
						</Link>
					</div>
				</div>
				{address && <AddressCard key={address.pk} address={address}/>}
			</React.Fragment>
	);
};

export default AddressDeleteSubPage;
