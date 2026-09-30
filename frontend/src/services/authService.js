import axios from "axios";

export const login = async (credentials) => {
  const response = await axios.post("http://localhost:3000/api/auth/login", credentials);
  const token = response.data.accessToken || response.data.token;
  if (token) {
    localStorage.setItem("token", token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getMe = async () => {
  const token = getToken();
  const response = await axios.get("http://localhost:3000/api/auth/me", {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  return response.data;
};