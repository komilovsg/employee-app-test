import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Система управления сотрудниками
        </Link>
      </div>
    </header>
  );
};

export default Header;
