import React from "react";
import GeneralLayout from "./../Layouts/GeneralLayout";

const AboutPage = () => {
  return (
    <React.Fragment>
      <GeneralLayout>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col text-center text-break">
              <h2 className="text-uppercase fs-2">About Page</h2>
            </div>
          </div>
        </div>
      </GeneralLayout>
    </React.Fragment>
  );
};

export default AboutPage;
