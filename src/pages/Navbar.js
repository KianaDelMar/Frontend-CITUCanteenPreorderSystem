import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import "../components/Navbar.css"; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <h1 className="logo">CIT-U Canteen Pre-Order</h1>
      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login" className="h1">Login</Link>
            <a className="h1">|</a>
            <Link to="/register" className="h1">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="login-btn">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;