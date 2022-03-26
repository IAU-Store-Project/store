import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import GeneralLayout from "../Layouts/GeneralLayout";
import ProductDetail from "../Components/Product/ProductDetail";


const ProductPage = () => {
  const [product, setProduct] = useState(false);
  const  params = useParams();

  useEffect(() => {
    var requestOptions = {method: "GET"};
    let url = `http://localhost:9000/products/${params.pid}`;
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => setProduct(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, [params]);

  if (!product) {
    return (<React.Fragment></React.Fragment>);
  }

  return (
    <React.Fragment>
      <GeneralLayout>
        <ProductDetail product={product} />
      </GeneralLayout>
    </React.Fragment>
  );
};

export default ProductPage;
