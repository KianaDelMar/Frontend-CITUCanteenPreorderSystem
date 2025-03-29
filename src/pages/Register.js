import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Register.css"; // Ensure this CSS file exists

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    // Add API call for registration here
  };

  return (
    <div className="body-container">
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <p>Create a new account to get started.</p>
        <form onSubmit={handleSubmit} className="register-form">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />

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

          <button type="submit" className="register-btn">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
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

export default Register;
