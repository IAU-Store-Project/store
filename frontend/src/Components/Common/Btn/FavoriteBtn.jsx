import React from "react";
import PropTypes from "prop-types";

const FavoriteBtn = ({ id }) => {
  return (
    <React.Fragment>
      <div className="btn btn-lg btn-light">
        <i className="fa-solid fa-heart"></i>
      </div>
    </React.Fragment>
  );
};

FavoriteBtn.propTypes = {
    id: PropTypes.number.isRequired
};

export default FavoriteBtn;
