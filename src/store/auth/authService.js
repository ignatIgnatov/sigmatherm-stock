import api from "../../config/axiosConfig";

export const login = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

export const logoutUser = async () => {
  await api.post("/api/auth/logout");
};
