import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <React.Fragment>
      <div className="col-3">
        <div className="card mb-3" style={{ width: "18rem" }}>
          <Link to={`/product/${product.title}/${product.id}`}>
            <img src={product.img} className="card-img-top" alt="Img 1" />
          </Link>

          <div className="card-body">
            <Link to={`/product/${product.title}/${product.id}`} className="text-decoration-none">
              <h5 className="card-title">{product.title}</h5>
            </Link>

            <p className="card-text">{product.description}</p>

            <Link
              to={`/product/${product.title}/${product.id}`}
              className="btn btn-primary"
            >
              <i className="fa-solid fa-bag-shopping"></i>&nbsp;
              <strong>
                {product.price}&nbsp;{product.currency}
              </strong>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
