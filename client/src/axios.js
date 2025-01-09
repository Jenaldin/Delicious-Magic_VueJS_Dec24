import axios from "axios";

const API_URL = "http://localhost:3000/api";
const axiosApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosApi.interceptors.request.use(
  (config) => {
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="));
    if (authCookie) {
      const token = authCookie.split("=")[1];
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosApi;
