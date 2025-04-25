// src/utils/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from './api';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext({
  token: null,
  user: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('token');
    return stored ? jwtDecode(stored) : null;
  });

  useEffect(() => {
    if (token) {
      // Configure axios to send the JWT
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Decode token to extract user info
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, role: decoded.role });
      localStorage.setItem('token', token);
    } else {
      // Clean up on logout
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  /**
   * Perform login by calling backend and storing the returned token.
   * @param {string} email
   * @param {string} password
   */
  async function login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    setToken(response.data.token);
  }

  /**
   * Clear authentication.
   */
  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}