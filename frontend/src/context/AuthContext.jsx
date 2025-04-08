import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, loginUser, registerUser, logoutUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Check if user is already logged in (token exists)
  useEffect(() => {
    const token = localStorage.getItem('mindmosaic_token');
    const storedUser = localStorage.getItem('mindmosaic_user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);

  // Query to fetch current user data
  const { refetch: refetchUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      if (data.success) {
        setUser(data.data.user);
        localStorage.setItem('mindmosaic_user', JSON.stringify(data.data.user));
      }
    },
    onError: () => {
      handleLogout();
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success) {
        setUser(data.data.user);
        setIsAuthenticated(true);
        refetchUser();
      }
    }
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // After successful registration, you might want to automatically log in
      // or redirect to login page
    }
  });

  // Logout function
  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear(); // Clear all queries in the cache
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: handleLogout,
    loginStatus: loginMutation.status,
    registerStatus: registerMutation.status,
    loginError: loginMutation.error,
    registerError: registerMutation.error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
