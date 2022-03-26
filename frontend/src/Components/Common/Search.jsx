import React from "react";

const Search = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="input-group mb-5 mt-5 p3">
              <input
                type="text"
                className="form-control"
                placeholder="iPhone, Sony Playstation..."
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Search;
