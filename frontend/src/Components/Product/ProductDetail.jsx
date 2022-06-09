import React from "react";

import FavoriteBtn from "../Common/Btn/FavoriteBtn";
import ProductCartBtn from "./ProductCartBtn";

const ProductDetail = ({ product }) => {
	return (
			<React.Fragment>
				<div className="container mb-4 mt-4">
					<div className="row">
						<div className="col-6">
							{product?.img && <img
									className="img-fluid"
									src={product.img}
									alt={product.title}/>}
						</div>
						<div className="col-6">
							<h3 className="mb-4 display-4">{product.title}</h3>
							<h4 className="mb-2">
								{product.price} &nbsp; {product.currency}
							</h4>
							<div className="row mt-3">
								<div className="col-12">
									<p>{product.description}</p>
								</div>
							</div>
							<div className="row mt-2">
								<div className="col-4">
									<select
											name="qty"
											className="form-select form-select-lg"
											required={true}>
										<option>Quantity</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
								</div>
								<div className="col-6 d-grid">
									<ProductCartBtn product={{ ...product }}/>
								</div>
								<div className="col-2 d-grid">
									<FavoriteBtn id={product?.id}/>
								</div>
							</div>
							<div className="clearfix">&nbsp;</div>
							<div className="row">
								<div className="col-12">
									<table className="table table-hover mt-5">
										<tbody>
										<tr>
											<td>SKU</td>
											<th>{product.sku}</th>
										</tr>
										<tr>
											<td>Brand</td>
											<th>{product.brand.name}</th>
										</tr>
										<tr>
											<td>Description</td>
											<th>{product.description}</th>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
	);
};

export default ProductDetail;
