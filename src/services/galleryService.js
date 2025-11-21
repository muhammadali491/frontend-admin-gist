// src/services/courseService.js
import axios from "axios";

// const API_URL = "http://localhost:5000/api/gallery";
const API_URL = "https://backend-gist-production.up.railway.app/api/gallery";

export const getGallery = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateGallery = async (formData) => {
  console.log("ready to update gallery ", formData);
  const id = formData.get("_id");
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const addNewGallery = async (formData) => {
  console.log("service to add Gallery ", formData);
  const response = await axios.post(`${API_URL}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deletingGallery = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
