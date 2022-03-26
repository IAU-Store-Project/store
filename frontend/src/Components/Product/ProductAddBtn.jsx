import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const ProductAddBtn = ({ product }) => {
  return (
    <Link
      to={`/product/${product.title}/${product.id}`}
      className="btn btn-danger btn-lg"
    >
      <i className="fa-solid fa-bag-shopping"></i>&nbsp;
      <strong>
        Add to Basket
      </strong>
    </Link>
  );
};

ProductAddBtn.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductAddBtn;
