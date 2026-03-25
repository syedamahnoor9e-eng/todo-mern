import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-mern-backend-awkg.onrender.com/api"
});

// Automatically attach token if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;