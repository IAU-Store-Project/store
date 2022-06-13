import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AddressForm = ({
	address,
	countries,
	handleSubmit,
	handleChange
}) => {
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
								<select name="country"
												id="country"
												className="form-select"
												value={address.country}
												onChange={handleChange}
												required={true}>
									<option key={`cs-0`}></option>
									{countries && countries?.map(country => (
											<option
													key={`cs-${country.id}`}
													value={`${country.id}`}>
												{country.name}
											</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-4">
							<div className="mb-3">
								<label htmlFor="state" className="form-label">
									State
								</label>
								<select name="state"
												id="state"
												className="form-select"
												value={address.state}
												onChange={handleChange}
												required={true}>
									<option></option>
									<option value="06">Ankara</option>
									<option value="16">Bursa</option>
									<option value="34">Istanbul</option>
								</select>
							</div>
						</div>
						<div className="col-4">
							<div className="mb-3">
								<label htmlFor="city" className="form-label">
									City
								</label>
								<select name="city"
												id="city"
												className="form-select"
												placeholder="First Name"
												value={address.city}
												onChange={handleChange}
												required={true}>
									<option></option>
									<option value="1">Merkez</option>
								</select>
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
													required={true}
								>{address.address}</textarea>
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
