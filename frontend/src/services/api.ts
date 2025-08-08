import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://your-api-base-url.com", // Change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
