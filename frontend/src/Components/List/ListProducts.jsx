import React, { useState, useEffect } from "react";
import API from "../../api";
import ProductCard from "../Product/ProductCard";

const ListProducts = () => {
	const [products, setProducts] = useState(false);

	useEffect(() => {
		let isMounted = true;
		let controller = new AbortController();

		const getNewestProducts = async () => {
			try {
				const response = await API.get(`products`, {
					params: { page_size: 16 },
					signal: controller.signal,
				});
				isMounted && setProducts(response.data.results);
			} catch (err) {
				console.error(err);
			}
		};

		getNewestProducts();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						{products?.length
								? products.map((product) => (
										<ProductCard
												key={`product-item-${product.id}`}
												product={product}
										/>
								)) : <p className="text-center m-3 text-muted">There are no
									products</p>
						}
					</div>
				</div>
			</React.Fragment>
	);
};

export default ListProducts;
