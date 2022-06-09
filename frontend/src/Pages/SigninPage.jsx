import React from "react";
import SigninForm from "./../Components/Account/SigninForm";

const SigninPage = () => {
  return (
    <React.Fragment>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-6 offset-3">
                <SigninForm />
            </div>
          </div>
        </div>
    </React.Fragment>
  );
};

export default SigninPage;
