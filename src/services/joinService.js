// src/services/courseService.js
import axios from "axios";

// const API_URL = "http://localhost:5000/api/gallery";
const API_URL = `${import.meta.env.VITE_API_URL}/api/join`;

export const getJoin = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateJoin = async (formData) => {
  console.log("ready to update Join ", formData);
  const id = formData.get("_id");
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deletingJoin = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
