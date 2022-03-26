import React from "react";

const SigninForm = () => {
  return (
    <React.Fragment>
      <form>
        <h3>Signin</h3>
        <div className="mb-3 mt-3 ">
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
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </React.Fragment>
  );
};

export default SigninForm;
