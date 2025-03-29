import React from "react";
import { Link } from "react-router-dom";
import "../components/Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
    <h1 className="logo">CIT-U Canteen Pre-Order</h1>
      <div className="nav-links">
        <Link to="/login">Login </Link>
        <a>|</a>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;