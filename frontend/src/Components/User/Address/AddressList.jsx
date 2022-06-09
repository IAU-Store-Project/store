import React, { useState, useEffect } from "react";

import API from "../../../api";
import { useAuth } from "../../../Services/auth";
import AddressCard from "./AddressCard";
import AddressNoFound from "./AddressNoFound";
import Spinner from "../../Common/Spinner";

const AddressList = () => {
	const [addresses, setAddresses] = useState();
	const [spin, setSpin] = useState(true);
	const { token } = useAuth();

	useEffect(() => {
		let isMounted = true;
		let controller = new AbortController();

		const getAddresses = async () => {
			try {
				const response = await API.get(`addresses`, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
					},
					signal: controller.signal,
				});
				isMounted && setAddresses(response.data);
			} catch (err) {
				console.log(err);
			} finally {
				setSpin(false);
			}
		};

		getAddresses();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [token]);

	if(spin) {
		return <Spinner />;
	}

	return (
			<React.Fragment>
				<div className="row">
					<div className="col-12">
						{addresses?.length
								? addresses.map((address) => (
										<AddressCard key={address.pk} address={address}/>
								)) : (
										<AddressNoFound/>
								)}
					</div>
				</div>
			</React.Fragment>
	);
};

export default AddressList;
