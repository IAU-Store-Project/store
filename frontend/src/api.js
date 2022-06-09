import axios from "axios";
import config from "./config"

const tkn = localStorage.getItem("token");

const instance = axios.create({
	baseURL: config.baseURL,
	timeout: 8000
});

if(tkn) {
	instance.defaults.headers.common['Authorization'] = `Bearer ${tkn}`;
}

export default instance;
