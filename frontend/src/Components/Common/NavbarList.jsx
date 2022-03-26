import { Link } from "react-router-dom";

import { NAVBAR_LINKS } from "./../../Services/Mock";

const NavbarList = () => {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {NAVBAR_LINKS.map((page, index) => (
        <li key={`page-${index}`} className="nav-item">
          <Link className="nav-link" aria-current="page" to={page.href}>
            {page.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarList;
