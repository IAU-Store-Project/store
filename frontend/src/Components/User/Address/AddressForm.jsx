import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import API from "../../../api";
import { useAuth } from "../../../Services/auth";
import CitySelectBox from "../../Address/CitySelectBox";
import StateSelectBox from "../../Address/StateSelectBox";
import CountrySelectBox from "../../Address/CountrySelectBox";

const AddressForm = ({
	address,
	handleSubmit,
	handleChange
}) => {
	const [countries, setCountries] = useState(null);
	const [states, setStates] = useState(null);
	const [cities, setCities] = useState(null);
	const { token } = useAuth();

	useEffect(() => {

		const getCountries = async () => {
			try {
				let response = await API.get(`addresses/countries`, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				setCountries(response.data);
			} catch (err) {
				console.log(err);
			}
		};

		const getStates = async (country_id) => {
			try {
				let response = await API.get(`/addresses/${country_id}/states/`, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				setStates(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		const getCities = async (state_id) => {
			try {
				let response = await API.get(`/addresses/${state_id}/cities/`, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				setCities(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		getCountries();

		if (address.country && address.country !== null && address.country !== "undefined") {
			getStates(address.country);
		}

		if (address.state && address.state !== null && address.state !== "undefined") {
			getCities(address.state);
		}
	}, [address, token])

	return (
			<React.Fragment>
				<form onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-12">
							<div className="mb-3">
								<label htmlFor="title" className="form-label">
									Title
								</label>
								<input type="text"
											 className="form-control"
											 id="title"
											 name="title"
											 minLength={2}
											 maxLength={80}
											 placeholder="Title"
											 onChange={handleChange}
											 value={address.title}
											 required={true}/>
							</div>
						</div>
						<div className="col-4">
							<div className="mb-3">
								<label htmlFor="city" className="form-label">
									Country
								</label>
								<CountrySelectBox
										address={address}
										handleChange={handleChange}
										countries={countries}/>
							</div>
						</div>
						<div className="col-4">
							<div className="mb-3">
								<label htmlFor="state" className="form-label">
									State
								</label>
								<StateSelectBox
										address={address}
										handleChange={handleChange}
										states={states}/>
							</div>
						</div>
						<div className="col-4">
							<div className="mb-3">
								<label htmlFor="city" className="form-label">
									City
								</label>
								<CitySelectBox
										address={address}
										handleChange={handleChange}
										cities={cities}/>
							</div>
						</div>
						<div className="col-12">
							<div className="mb-3">
								<label htmlFor="city" className="form-label">
									Address
								</label>
								<textarea name="address"
													id="address"
													cols="5"
													rows="3"
													className="form-control"
													onChange={handleChange}
													required={true}>
									{address.address}
								</textarea>
							</div>
						</div>
					</div>
					<button type="submit"
									className="btn btn-dark mt-2">
						Submit
					</button>
					&nbsp;
					<Link to="/user/address"
								className="btn btn-light mt-2">
						Cancel
					</Link>
				</form>
			</React.Fragment>
	);
};

AddressForm.propTypes = {
	address: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
};

export default AddressForm;
