import React, { useState } from "react";
import { useAuth } from "./../../Services/auth";
import { Link } from "react-router-dom";

const SigninForm = () => {
	const [user, setUser] = useState({ email: "", password: "" });
	const { signIn } = useAuth();

	const handleChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		setUser({
			...user,
			[name]: value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		signIn(user);
	};

	return (
			<React.Fragment>
				<form onSubmit={handleSubmit}>
					<h3>Signin</h3>
					<div className="mb-3 mt-3 ">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input name="email"
									 type="email"
									 className="form-control"
									 value={user.email}
									 onChange={handleChange}
									 minLength={6}
									 maxLength={160}
									 placeholder="email@example.com"
									 required={true} />
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">
							Password
						</label>
						<input name="password" type="password" className="form-control"
									 value={user.password}
									 onChange={handleChange}
									 minLength={4}
									 maxLength={12}
									 placeholder="Password"
									 required={true} />
					</div>

					<button type="submit" className="btn btn-primary mt-3">
						Login
					</button>
					<div className="clearfix mt-2 mb-2">&nbsp;</div>
					<hr className="text-gray"/>
					<div className="clearfix mt-2 mb-2">&nbsp;</div>
					Don't have an account? &nbsp;
					<Link to={`/signup`}>
						Sign Up
					</Link>

				</form>
			</React.Fragment>
	);
};

export default SigninForm;
