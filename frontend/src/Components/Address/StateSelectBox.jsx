import React from "react";
import PropTypes from "prop-types";

const StateSelectBox = ({ address, handleChange, states }) => {
	return (
			<select name="state"
							id="state"
							className="form-select"
							value={address.state}
							onChange={handleChange}
							required={true}>
				<option key={`ss-0`}></option>
				{address?.country && states && states?.map(state_obj => (
						<option
								key={`ss-${state_obj.id}`}
								value={`${state_obj.id}`}>
							{state_obj.name}
						</option>
				))}
			</select>
	);
};

StateSelectBox.propTypes = {
	address: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	states: PropTypes.object.isRequired,
};

export default StateSelectBox;
