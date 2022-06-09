import { Link } from "react-router-dom";

import { useAuth } from "./../../Services/auth";

const UserMenu = () => {
	const { signOut } = useAuth();

	return (
			<ul className="list-group list-group-flush">
				<li className="list-group-item">
					<Link to="/user/profile" className="text-decoration-none">
						Profile
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/user/orders" className="text-decoration-none">
						Orders
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/user/address" className="text-decoration-none">
						Address
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/user/card" className="text-decoration-none">
						Billings
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/" onClick={signOut}
								className="text-decoration-none text-danger"
								style={{ cursor: "pointer" }}>
						Signout
					</Link>
				</li>
			</ul>
	);
};

export default UserMenu;
