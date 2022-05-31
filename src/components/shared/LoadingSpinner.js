import React from "react";
import "./scss/LoadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <div className="container">
      <div className="col-sm-2">
        <div className="sp sp-wave"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
