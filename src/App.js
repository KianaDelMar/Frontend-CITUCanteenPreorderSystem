import React, { useState } from "react";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './pages/AuthContext';
import SellerPage from './pages/SellerPage'

function App() {
  return (
    <Router>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller" element={
          <ProtectedRoute allowedRoles={['seller', 'admin']}>
            <SellerPage />
          </ProtectedRoute>
        }/>
        <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;