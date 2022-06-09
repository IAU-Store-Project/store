import React from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

import API from "../api";
import CONFIG from "../config";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
	const [token, setToken] = React.useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	const getMe = async (token) => {
		try {
			let controller = new AbortController();

			const response = await API.get(`auth/me/`, {
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
				},
				signal: controller.signal,
			});
			localStorage.setItem("user-detail", JSON.stringify(response.data));
		} catch (err) {
			console.error(err);
		}
	};

	const handleLogin = async (obj) => {

		const getToken = async (obj) => {
			try {
				let controller = new AbortController();
				let origin = location.state?.from?.pathname || CONFIG.constants.DEFAULT;
				let response = await API.post(`auth/token/`, obj, {
					signal: controller.signal,
				});
				setToken(response.data.access);
				localStorage.setItem("username", obj.username);
				getMe(response.data.access);
				navigate(origin);
			} catch (err) {
				console.error(err);
			}
		};

		getToken(obj);
	};

	const handleLogout = () => {
		setToken(null);
		let origin = location.state?.from?.pathname || CONFIG.constants.HOME;
		navigate(origin);
	};

	const value = {
		token,
		signIn: handleLogin,
		signOut: handleLogout,
	};

	return (
			<AuthContext.Provider value={value}>
				{children}
			</AuthContext.Provider>
	);
};

const useAuth = () => {
	return React.useContext(AuthContext);
};

const ProtectedRoute = ({ children }) => {
	const { token } = useAuth();
	const location = useLocation();

	if (token) {
		return children;
	}

	return <Navigate to={CONFIG.constants.REDIRECT_PATH} replace
									 state={{ from: location }}/>;
};

export { AuthProvider, ProtectedRoute, useAuth };

// https://dev.to/nilanth/how-to-secure-jwt-in-a-single-page-application-cko
