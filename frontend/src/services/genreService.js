import axios from "axios";
import { getToken } from "./authService";

const getAuthHeader = () => {
  let token = getToken();
  if (!token || token === "undefined" || token === "null") {
    token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  }
  return {
    headers: { 
      Authorization: token ? `Bearer ${token}` : "" 
    },
  };
};

export const getGenres = async () => {
  const response = await axios.get("http://localhost:3000/api/genres", getAuthHeader());
  return response.data;
};

export const getGenreById = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/genres/${id}`, getAuthHeader());
  return response.data;
};

export const createGenre = async (data) => {
  const response = await axios.post("http://localhost:3000/api/genres", data, getAuthHeader());
  return response.data;
};

export const updateGenre = async (id, data) => {
  const response = await axios.patch(`http://localhost:3000/api/genres/${id}`, data, getAuthHeader());
  return response.data;
};

export const deleteGenre = async (id) => {
  const response = await axios.delete(`http://localhost:3000/api/genres/${id}`, getAuthHeader());
  return response.data;
};