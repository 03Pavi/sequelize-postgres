import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL, // Use NEXT_PUBLIC_ for frontend
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const fullUrl = `${config.baseURL ?? ""}${config.url}`;
  console.log("Making request to:", fullUrl);
  return config;
});

export default axiosInstance;
