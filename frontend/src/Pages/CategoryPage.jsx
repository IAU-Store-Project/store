import React, { useState, useEffect } from "react";
import GeneralLayout from "../Layouts/GeneralLayout";

import { useParams } from "react-router-dom";
import ProductCard from "../Components/Product/ProductCard";

const CategoryPage = () => {
  let params = useParams();



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
      <GeneralLayout>
        <div className="container">
          <div className="row">
            <div className="col mt-3 mb-3 text-center">
              <h3>{params.category_name.toUpperCase()}</h3>
            </div>
          </div>

          <div className="row">
            {products.map((product, index) => (
              <ProductCard
                key={`product-item-${index}`}
                product={product}
              />
            ))}
          </div>
        </div>
      </GeneralLayout>
    </React.Fragment>
  );
};

export default CategoryPage;
