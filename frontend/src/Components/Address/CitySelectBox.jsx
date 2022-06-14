import React from "react";
import PropTypes from "prop-types";

const CitySelectBox = ({ address, handleChange, cities }) => {
	return (
			<select name="city"
							id="city"
							className="form-select"
							value={address.city}
							onChange={handleChange}
							required={true}>
				<option key={`cs-0`}></option>
				{address?.state && cities && cities?.map(city_obj => (
						<option
								key={`cc-${city_obj.id}`}
								value={`${city_obj.id}`}>
							{city_obj.name}
						</option>
				))}
			</select>
	);
};

CitySelectBox.propTypes = {
	address: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	cities: PropTypes.object.isRequired,
};

export default CitySelectBox;
