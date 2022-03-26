import React, { useState } from "react";

const SignupForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    repassword: "",
    agree: "no",
  });

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name && value) {
      setForm({
        ...form,
        [name]: value
      });      
    }
  };

  console.log("form:", form);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <div className="mt-3 mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" name="email" className="form-control" onChange={handleChange} />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" name="password" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Re-Password
          </label>
          <input type="password" name="repassword" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" name="agree" className="form-check-input" onChange={handleChange}  />
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
