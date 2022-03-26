import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryNavbar = () => {
  const [categories, setCategories] = useState(false);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:9000/categories", requestOptions)
      .then((response) => response.text())
      .then((result) => setCategories(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);

  if (!categories) {
    return (<React.Fragment></React.Fragment>);
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light pt-2 mt-3">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {categories &&
                categories.map((category, index) => (
                  <li key={`cat-${index}`} className="nav-item">
                    <Link className="nav-link" to={category.href}>
                      {category.title}
                    </Link>
                  </li>
                ))}

              {!categories && (
                <li key={`cat-0`} className="nav-item">
                  <Link className="nav-link" to="/">
                    All
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default CategoryNavbar;
