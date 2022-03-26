import React from "react";

import GeneralLayout from "../Layouts/GeneralLayout";

const BasketPage = () => {
  return (
    <React.Fragment>
      <GeneralLayout>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col text-center">
              <div className="card">
                <div className="card-body p3">
                  <h2 className="mt5 mb5">Basket is empty!</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GeneralLayout>
    </React.Fragment>
  );
};

export default BasketPage;
