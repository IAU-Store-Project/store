import React from "react";
import SignupForm from "./../Components/Account/SignupForm";

const SignupPage = () => {
  return (
    <React.Fragment>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-6 offset-3">
                <SignupForm />
            </div>
          </div>
        </div>
    </React.Fragment>
  );
};

export default SignupPage;
