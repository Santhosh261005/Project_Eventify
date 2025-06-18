import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

// User APIs
export const userSignup = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/user/signup`, userData);
  return response.data;
};

export const userLogin = async (loginData) => {
  const response = await axios.post(`${API_BASE_URL}/user/login`, loginData);
  return response.data;
};

// Organiser APIs
export const organiserSignup = async (organiserData) => {
  const response = await axios.post(`${API_BASE_URL}/organiser/signup`, organiserData);
  return response.data;
};

export const organiserLogin = async (loginData) => {
  const response = await axios.post(`${API_BASE_URL}/organiser/login`, loginData);
  return response.data;
};
