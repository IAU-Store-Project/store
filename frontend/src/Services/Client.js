
const API_ENDPOINT = "http://127.0.0.1:8000/api";

const URLS = {
	auth: "/auth/token/",
	categories: "/categories",
	register: "/auth/register/",
	me: "/auth/me/",
}

var headers = new Headers();

headers.append("Content-Type", "application/json");

const Client = {
	API_ENDPOINT: API_ENDPOINT,
	URLS: URLS,
	headers: headers,
}

export { API_ENDPOINT, URLS, headers }

export default Client;

