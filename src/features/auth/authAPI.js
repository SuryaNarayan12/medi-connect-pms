// src/features/auth/authAPI.js
import api from "../../api/api"; // axios instance

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data; // { token, user }
};

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
