import axiosInstance from '../api/axiosInstance';

export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  
  // Store the token in localStorage if login is successful
  if (response.data.success && response.data.data.token) {
    localStorage.setItem('mindmosaic_token', response.data.data.token);
    localStorage.setItem('mindmosaic_user', JSON.stringify(response.data.data.user));
  }
  
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('mindmosaic_token');
  localStorage.removeItem('mindmosaic_user');
};