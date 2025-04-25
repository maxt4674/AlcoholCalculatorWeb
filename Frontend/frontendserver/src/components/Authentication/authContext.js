import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser({
            username: decodedToken.sub,
            userType: decodedToken.userType, 
            email: decodedToken.email,
          });
          setIsAuthenticated(true);  
        } else {
          logout(); 
        }
      } catch (error) {
        console.error('Token decode error', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token); 
    const decodedToken = jwtDecode(token);
    setUser({
      username: decodedToken.sub,
      userType: decodedToken.userType,
      email: decodedToken.email,
    });
    setIsAuthenticated(true); 
  };

  const logout = () => {
    localStorage.removeItem('authToken'); 
    setUser(null);
    setIsAuthenticated(false); 
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);