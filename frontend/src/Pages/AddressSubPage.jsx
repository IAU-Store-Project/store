import React from "react";

import AddressList from "../Components/User/Address/AddressList";
import AddressMenu from "../Components/User/Address/AddressMenu";

const AddressSubPage = () => {
	return (
			<React.Fragment>
				<AddressMenu />
				<AddressList/>
			</React.Fragment>
	);
};

export default AddressSubPage;
