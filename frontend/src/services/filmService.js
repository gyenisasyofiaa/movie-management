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

export const getFilms = async () => {
  const response = await axios.get("http://localhost:3000/api/films", getAuthHeader());
  return response.data;
};

export const getFilmById = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/films/${id}`, getAuthHeader());
  return response.data;
};

export const createFilm = async (data) => {
  const response = await axios.post("http://localhost:3000/api/films", data, getAuthHeader());
  return response.data;
};

export const updateFilm = async (id, data) => {
  const response = await axios.patch(`http://localhost:3000/api/films/${id}`, data, getAuthHeader());
  return response.data;
};

export const deleteFilm = async (id) => {
  const response = await axios.delete(`http://localhost:3000/api/films/${id}`, getAuthHeader());
  return response.data;
};