import React from "react";
import FavoriteBtn from "../Common/Btn/FavoriteBtn";
import ProductAddBtn from "./ProductAddBtn";

const ProductDetail = ({ product }) => {
  return (
    <React.Fragment>
      <div className="container mb-4 mt-4">
        <div className="row">
          <div className="col-6">
            {product?.img && <img className="img-fluid" src={product.img} alt={product.title} />}
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
                  aria-label="Default select example"
                >
                  <option selected>Quantity</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="col-6 d-grid">
                <ProductAddBtn product={product} />
              </div>
              
              <div className="col-2 d-grid">
                <FavoriteBtn id={product?.id} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
