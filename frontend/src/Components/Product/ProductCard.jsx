import React from "react";
import { Link } from "react-router-dom";
import ProductCartBtn from "./ProductCartBtn";

const ProductCard = ({ product }) => {
	return (
			<React.Fragment>
				<div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
					<div className="card mb-4">
						<Link to={`/product/${product.slug}/${product.id}`}>
							<img src={product.img}
									 className="card-img-top"
									 alt={product.title}/>
						</Link>
						<div className="card-body">
							<Link to={`/product/${product.slug}/${product.id}`}
										className="text-decoration-none">
								<h6 className="card-title text-center m-3 text-dark"
										style={{minHeight: '32px'}}>
									{/*57*/}
									{product.title}
								</h6>
							</Link>
							<p className="card-text text-muted text-center">{product.category?.name}</p>
							<div className="d-grid gap-2">
								<ProductCartBtn product={{ ...product }} />
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
	);
};

export default ProductCard;
