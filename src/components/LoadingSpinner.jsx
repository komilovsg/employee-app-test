import React from "react";
import "../styles/LoadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Загрузка...</p>
    </div>
  );
};

export default LoadingSpinner;
