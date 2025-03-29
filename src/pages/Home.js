import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../components/Home.css"; // Ensure this CSS file exists

const Home = () => {
  return (
    <div className = "app-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>WELCOME TO KMJS!</h1>
        <p>Tired of waiting in line? Skip the wait and order online!</p>
        <button className="cta-btn">Order Now</button>
      </div>

      {/* Footer Section */}
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

export default Home;
