// src/services/courseService.js
import axios from "axios";

// const API_URL = "http://localhost:5000/api/gallery";
const API_URL = "https://backend-gist-production.up.railway.app/api/message";

export const getMessage = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deletingMessage = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
