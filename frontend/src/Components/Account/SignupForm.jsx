import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../../api";

const SignupForm = () => {
	const [completed, setCompleted] = useState(false);
	const [user, setUser] = useState();
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();
		setCompleted(false);

		const createUser = async () => {
			try {
				let response = await API.post(`/auth/register/`, user, {
					headers: {
						'Accept': 'application/json',
						'Content-Type': "application/json"
					},
				});
				setUser(response.data);
				navigate("/user/address", { replace: true });
				setCompleted("COMPLETED");
			} catch (err) {
				console.error(err);
				setCompleted(false);
			}
		};

		createUser();
	};

	useEffect(() => {
		if (completed === "COMPLETED") {
			navigate("/signin", { replace: true });
		}	}, [completed, navigate]);

	const handleChange = e => {
		setCompleted(false);
		const target = e.target;
		const value = target.value;
		const name = target.name;
		setUser({
			...user,
			[name]: value,
		});
	};

	return (
			<React.Fragment>
				<form onSubmit={handleSubmit}>
					<h3>Signup</h3>
					<div className="row">
						<div className="col-6">
							<div className="mt-3 mb-3">
								<label htmlFor="email" className="form-label">
									E-mail
								</label>
								<input type="email"
											 name="email"
											 onChange={handleChange}
											 id="email"
											 placeholder="E-mail"
											 className="form-control"
											 required="required"
								/>
								<div id="emailHelp" className="form-text">
									We'll never share your email with anyone else.
								</div>
								{completed?.email && completed.email.map(item => (
										<p className="fs-6 text-danger" role="alert" key={item.toString()}>
											<strong>{item}</strong>
										</p>
								))}
							</div>
						</div>
						<div className="col-6">
							<div className="mt-3 mb-3">
								<label htmlFor="phone" className="form-label">
									Phone
								</label>
								<input type="number"
											 name="phone"
											 onChange={handleChange}
											 id="phone"
											 placeholder="Mobile"
											 className="form-control"
											 minLength={6}
											 maxLength={16}
											 required="required"
								/>
								{completed?.username && completed.username.map(item => (
										<p className="fs-6 text-danger" role="alert" key={item.toString()}>
											<strong>{item}</strong>
										</p>
								))}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="mt-3 mb-3">
								<label htmlFor="first_name" className="form-label">
									First Name
								</label>
								<input type="text"
											 name="first_name"
											 onChange={handleChange}
											 id="first_name"
											 placeholder="First Name"
											 className="form-control"
											 required="required"
								/>

								{completed?.first_name && completed.first_name.map(item => (
										<p className="fs-6 text-danger" role="alert" key={item.toString()}>
											<strong>{item}</strong>
										</p>
								))}

							</div>
						</div>
						<div className="col-6">
							<div className="mt-3 mb-3">
								<label htmlFor="last_name" className="form-label">
									Last Name
								</label>
								<input type="text"
											 name="last_name"
											 onChange={handleChange}
											 id="last_name"
											 placeholder="Last Name"
											 className="form-control"
											 required="required"
								/>

								{completed?.last_name && completed.last_name.map(item => (
										<p className="fs-6 text-danger" role="alert" key={item.toString()}>
											<strong>{item}</strong>
										</p>
								))}

							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="mb-3">
								<label htmlFor="password" className="form-label">
									Password
								</label>
								<input type="password"
											 name="password"
											 onChange={handleChange}
											 id="password"
											 placeholder="Password"
											 minLength={8}
											 maxLength={10}
											 required="required"
											 className="form-control"/>

								{completed?.password && completed.password.map(item => (
										<p className="fs-6 text-danger" role="alert" key={item.toString()}>
											<strong>{item}</strong>
										</p>
								))}

							</div>
						</div>
						<div className="col-6">
							<div className="mb-3">
								<label htmlFor="repassword" className="form-label">
									Re-Password
								</label>
								<input type="password"
											 name="password2"
											 onChange={handleChange}
											 id="repassword"
											 placeholder="Password Again"
											 minLength={8}
											 maxLength={10}
											 required="required"
											 className="form-control"/>

								{completed?.password2 && completed.password2.map(item => (
										<p className="fs-6 text-danger" role="alert" key={item.toString()}>
											<strong>{item}</strong>
										</p>
								))}
							</div>
						</div>
					</div>
					<button type="submit" className="btn btn-success mt-3">
						Register
					</button>
					<div className="clearfix mt-2 mb-2">&nbsp;</div>
					<hr className="text-gray"/>
					<div className="clearfix mt-2 mb-2">&nbsp;</div>
					Do you have already account? &nbsp;<Link to={`/signin`}>Sign In</Link>
				</form>
			</React.Fragment>
	);
};

export default SignupForm;
