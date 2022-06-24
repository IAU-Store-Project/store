import React, { Fragment, useEffect, useState } from "react";
import API from "../../api";
import ProductCard from "../Product/ProductCard";

const Search = () => {
	const [search, setSearch] = useState(null);
	const [products, setProducts] = useState(null);

	useEffect(() => {

	}, []);

	const getSearch = async (search) => {
		try {
			const response = await API.get(`products/search?search=${search}`);
			setProducts(response.data);
		} catch (err) {
			console.log(err);
		} finally {
			//setSpin(false);
		}
	};

	const handleChange = (e) => {
		const { value } = e.target;
		setSearch(value);
		if (value.length > 2) {
			getSearch(value);
		}
	};

	return (
			<Fragment>
				<div className="container-fluid">
					<div className="row">
						<div
								className="col-lg-6 col-md-8 col-sm-10 col-xs-10 offset-lg-3 offset-md-2 offset-sm-1 offset-xs-1">
							<div className="input-group mb-5 mt-5 p3">
								<input
										type="text"
										name="search"
										className="form-control"
										placeholder="iPhone, Sony Playstation..."
										onChange={handleChange}
								/>
								<button
										className="btn btn-outline-secondary"
										type="button"
										id="button-addon1"
								>
									<i className="fa fa-search"></i>
								</button>
							</div>
						</div>
					</div>
				</div>

				{search?.length > 2 && (
						<div className="container">
							<div className="row">
									{products?.length
											? products.map((product) => (
													<ProductCard
															key={`search-item-${product.id}`}
															product={product}
													/>
											)) : (
													<p className="text-center m-3 text-muted">
														There are no products
													</p>
											)
									}
							</div>
						</div>
				)}

			</Fragment>
	);
};

export default Search;
