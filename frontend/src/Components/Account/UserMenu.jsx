import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <Link to="/user/profile" className="text-decoration-none">
          Profile
        </Link>
      </li>
      <li className="list-group-item">
        <Link to="/user/address" className="text-decoration-none">
          Address
        </Link>
      </li>
      <li className="list-group-item">
        <Link to="/user/cards" className="text-decoration-none">
          Billings
        </Link>
      </li>
    </ul>
  );
};

export default UserMenu;
