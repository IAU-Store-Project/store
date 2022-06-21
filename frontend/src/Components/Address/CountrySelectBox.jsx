import React from "react";
import PropTypes from "prop-types";

const CountrySelectBox = ({ address, handleChange, countries }) => {
	return (
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
	);
};

CountrySelectBox.propTypes = {
	address: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	country: PropTypes.object.isRequired,
};

export default CountrySelectBox;
