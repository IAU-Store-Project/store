import React from "react";

const Search = () => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10 col-xs-10 offset-lg-3 offset-md-2 offset-sm-1 offset-xs-1">
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
