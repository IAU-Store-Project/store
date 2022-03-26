import React from "react";
import GeneralLayout from "./../Layouts/GeneralLayout";
import SignupForm from "./../Components/Account/SignupForm";

const SignupPage = () => {
  return (
    <React.Fragment>
      <GeneralLayout>
        <div class="container mt-5 mb-5">
          <div class="row">
            <div class="col-6 offset-3">
                <SignupForm />
            </div>
          </div>
        </div>
      </GeneralLayout>
    </React.Fragment>
  );
};

export default SignupPage;
