import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const login = (credentials) => {
    const mockUsers = [
      { id: 'user-001', email: 'student@univ.edu', name: 'John Student', role: 'student', password: "student123" },
      { id: 'user-002', email: 'prof@univ.edu', name: 'Dr. Smith', role: 'faculty', password: "faculty123" },
      { id: 'admin-001', email: 'admin@univ.edu', name: 'Admin User', role: 'admin', password: "admin123" },
      { id: 'seller-001', email: 'seller@univ.edu', name: 'Junior HighSchool Canteen', role: 'seller', password: 'seller123'}
    ];
    
    const foundUser = mockUsers.find(u => u.email === credentials.email);
    if (foundUser) {
      setUser(foundUser);
      switch (foundUser.role) {
        case 'admin':
          navigate('/dashboard');
          break;
        case 'seller':
          navigate('/seller');
          break;
        case 'student':
        case 'faculty':
        default:
          navigate('/dashboard');
          break;
      }
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
    navigate('/');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {return useContext(AuthContext);
};