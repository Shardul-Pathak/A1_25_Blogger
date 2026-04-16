import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verify token on mount and when token might have changed
  const verifyToken = useCallback(async () => {
    try {
      const response = await axiosInstance.post('/users/verify', {});
      if (response.status === 200) {
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password
      });
      if (response.status === 200 && response.data.success) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/users/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
