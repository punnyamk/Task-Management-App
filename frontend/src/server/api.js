import axios from "axios";

const api = axios.create({
  baseURL: "https://task-management-app-backend-ylum.onrender.com/api",
});

export default api;
