import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

const CategoryNavbar = () => {
  const [categories, setCategories] = useState(false);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();

    const getCategories = async () => {
      try {
        let response = await API.get(`categories`, {
          headers: {
            'Accept': 'application/json'
          },
          signal: controller.signal
        });
        isMounted && setCategories(response.data.results)
      } catch (err) {
        console.error(err);
      }
    };

    getCategories();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (!categories) {
    return (<React.Fragment></React.Fragment>);
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light pt-2 mt-3">
        <div className="container-fluid">
          <button
            className={collapse ? `navbar-toggler collapsed` : `navbar-toggler`}
            onClick={() => (setCollapse(!collapse))}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded={collapse}
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span> Categories
          </button>

          <div
              className={collapse ? `collapse navbar-collapse show` : `collapse navbar-collapse`}
              id="navbarNavDropdown">
            <ul className="navbar-nav">
              {categories &&
                categories.map((category, index) => (
                  <li key={`cat-${category.id}`} className="nav-item">
                    <Link className="nav-link" to={`/category/${category.id}/${category.slug}/`}>
                      {category.name}
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
