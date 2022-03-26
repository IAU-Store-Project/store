import React from "react";

const SignupForm = () => {
  return (
    <React.Fragment>
      <form>
        <h3>Signup</h3>
        <div className="mt-3 mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" />
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Re-Password
          </label>
          <input type="repassword" className="form-control" />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignupForm;
