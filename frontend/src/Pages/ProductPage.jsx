import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import API from "../api";
import ProductDetail from "../Components/Product/ProductDetail";

const ProductPage = () => {
	const [product, setProduct] = useState(false);
	const params = useParams();

	useEffect(() => {
		API.get(`products/${params.pid}`)
				.then(response => {
					if (response.status !== 200) return;
					const product = response.data;
					setProduct(product);
				});
	}, [params]);

	if (!product) {
		return (<React.Fragment></React.Fragment>);
	}

	return (
			<React.Fragment>
				<ProductDetail product={product}/>
			</React.Fragment>
	);
};

export default ProductPage;
