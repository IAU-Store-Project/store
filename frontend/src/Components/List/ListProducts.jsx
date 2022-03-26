import React, { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";


const ListProducts = () => {
  const [products, setProducts] = useState(false);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:9000/products", requestOptions)
      .then((response) => response.text())
      .then((result) => setProducts(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);

  if (!products) {
    return (<React.Fragment></React.Fragment>);
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">

          {products.map((product, index) => (
             <ProductCard
             key={`product-item-${index}`}
             product={product}
             />
          ))}

        </div>
      </div>
    </React.Fragment>
  );
};

export default ListProducts;
