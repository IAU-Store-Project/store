import React, { useState, useEffect } from "react";

import API from "../api";
import { useAuth } from "../Services/auth";
import Spinner from "../Components/Common/Spinner";

const ProfileSubPage = () => {
	const [completed, setCompleted] = useState(false);
	const [account, setAccount] = useState({
		first_name: null, last_name: null, email: null, phone: null,
	});
	const { token } = useAuth();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getAccount = async () => {
			try {
				let response = await API.get(`/auth/me/`, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": 'application/json',
					},
					signal: controller.signal,
				});
				isMounted && setAccount(response.data);
				setCompleted(true);
			} catch (err) {
				console.error(err);
			}
		};

		getAccount();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [token]);

	const handleSubmit = e => {
		e.preventDefault();
		setCompleted(true);

		const saveAccount = async () => {
			try {
				let response = await API.put(`/auth/me/`, account, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				console.info(response.data);
			} catch (err) {
				console.error("err", err);
			}
		};

		saveAccount();
	};

	const handleChange = e => {
		setCompleted(false);
		const target = e.target;
		const value = target.value;
		const name = target.name;
		setAccount({
			...account,
			[name]: value,
		});
	};

	if(! account.email) {
		return <Spinner />;
	}

	return (
			<React.Fragment>
				<div className="row">
					<div className="col-12">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-6">
									<div className="mb-3">
										<label htmlFor="first_name" className="form-label">
											First Name
										</label>
										<input type="text"
													 className="form-control"
													 id="first_name"
													 name="first_name"
													 minLength={2}
													 maxLength={80}
													 placeholder="First Name"
													 onChange={handleChange}
													 value={account.first_name}
													 required={true}/>
									</div>
								</div>
								<div className="col-6">
									<div className="mb-3">
										<label htmlFor="last_name" className="form-label">
											Last Name
										</label>
										<input type="text"
													 className="form-control"
													 id="last_name"
													 name="last_name"
													 minLength={2}
													 maxLength={80}
													 placeholder="Last Name"
													 onChange={handleChange}
													 value={account.last_name}
													 required={true}/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-6">
									<div className="mb-3">
										<label htmlFor="email"
													 className="form-label">E-mail</label>
										<input type="email"
													 className="form-control"
													 id="email"
													 name="email"
													 minLength={2}
													 maxLength={80}
													 placeholder="Email"
													 onChange={handleChange}
													 value={account.email}
													 required={true}/>
										{completed?.email && completed.email.map(item => (
												<p className="fs-6 text-danger" role="alert"
													 key={item.toString()}>
													<strong>{item}</strong>
												</p>
										))}
									</div>
								</div>
								<div className="col-6">
									<div className="mb-3">
										<label htmlFor="phone"
													 className="form-label">Mobile Phone</label>
										<input type="phone"
													 className="form-control"
													 id="phone"
													 name="phone"
													 minLength={2}
													 maxLength={80}
													 placeholder="Mobile Phone"
													 onChange={handleChange}
													 value={account.phone}
													 required={true}/>
									</div>
								</div>
							</div>
							<div className="clearfix">&nbsp;</div>
							<button type="submit"
											disabled={completed}
											className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</React.Fragment>
	);
};

export default ProfileSubPage;
