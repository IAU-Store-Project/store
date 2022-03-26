import React from "react";
import GeneralLayout from "./../Layouts/GeneralLayout";
import SigninForm from "./../Components/Account/SigninForm";

const SigninPage = () => {
  return (
    <React.Fragment>
      <GeneralLayout>
        <div class="container mt-5 mb-5">
          <div class="row">
            <div class="col-6 offset-3">
                <SigninForm />
            </div>
          </div>
        </div>
      </GeneralLayout>
    </React.Fragment>
  );
};

export default SigninPage;
