import React from "react";

import GeneralLayout from "./../Layouts/GeneralLayout";
import UserMenu from "./../Components/Account/UserMenu";

const ProfilePage = () => {
  return (
    <React.Fragment>
      <GeneralLayout>
        <div className="container mt-5 mb-5">
          {/* <div className="row">
            <div className="col">
              <h2 className="text-uppercase fs-2">Profile</h2>
            </div>
          </div> */}
          <div className="row">
            <div className="col-3">
              <div className="card">
                <UserMenu />
              </div>
            </div>
            <div className="col-9">
                <div className="alert alert-info" role="alert">
                  Please update your address.
                </div>
            </div>
          </div>
        </div>
      </GeneralLayout>
    </React.Fragment>
  );
};

export default ProfilePage;
