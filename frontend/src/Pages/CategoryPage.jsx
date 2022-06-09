import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import API from "../api";
import ProductCard from "../Components/Product/ProductCard";

const CategoryPage = () => {
	let params = useParams();

	const [products, setProducts] = useState(false);

	useEffect(() => {
		API.get(`products`)
				.then(response => {
					if (response.status !== 200) return;
					const products = response.data;
					setProducts(products.results);
				});
	}, []);

	return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						<div className="col mt-3 mb-3 text-center">
							<h3>{params.category_name.toUpperCase()}</h3>
						</div>
					</div>
					<div className="row">
						{products && products.map((product) => (
								<ProductCard
										key={`product-item-${product.id}`}
										product={product}
								/>
						))}
					</div>
				</div>
			</React.Fragment>
	);
};

export default CategoryPage;
