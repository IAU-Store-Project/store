import React from "react";
import Search from "./../Components/Common/Search";
import Heros from "./../Components/Common/Heros";
import ListProducts from "./../Components/List/ListProducts";

const HomePage = () => {
	return (
			<React.Fragment>
				<Search/>
				<Heros/>
				<ListProducts/>
			</React.Fragment>
	);
};

export default HomePage;
