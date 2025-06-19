import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [organizer, setOrganizer] = useState(
    localStorage.getItem('organizer') ? JSON.parse(localStorage.getItem('organizer')) : null
  );
  const navigate = useNavigate();

  const login = (newToken, organizerData) => {
    // Ensure organizerData has _id, not just id
    if (organizerData && organizerData.id && !organizerData._id) {
      organizerData._id = organizerData.id;
      delete organizerData.id;
    }
    localStorage.setItem('token', newToken);
    localStorage.setItem('organizer', JSON.stringify(organizerData));
    setToken(newToken);
    setOrganizer(organizerData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('organizer');
    setToken(null);
    setOrganizer(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedOrganizer = localStorage.getItem('organizer');
    if (storedToken) setToken(storedToken);
    if (storedOrganizer) setOrganizer(JSON.parse(storedOrganizer));
  }, []);

  // Add axios interceptor for auth token
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
          navigate('/organizer/signin');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, navigate]);

   return (
    <AuthContext.Provider value={{ token, organizer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}