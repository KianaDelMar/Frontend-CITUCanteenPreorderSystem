import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import "../components/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login({ email, password });
    
    if (!success) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="body-container">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <p>Enter your credentials to access your account.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="about-us">
            <h3>About Us</h3>
            <p>
              KMJS is dedicated to providing a fast and easy way to order food.
              Our mission is to help you skip long lines and enjoy your meals hassle-free.
            </p>
          </div>

          <div className="contact-us">
            <h3>Contact Us</h3>
            <p>Email: support@kmjs.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Follow us on <Link to="/contact">social media</Link></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
