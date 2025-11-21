// src/services/courseService.js
import axios from "axios";

// const API_URL = "http://localhost:5000/api/courses";
const API_URL = "https://backend-gist-production.up.railway.app/api/courses";

export const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateCourse = async (formData) => {
  console.log("service to update course ", formData);
  const id = formData.get("_id");
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const addNewCourse = async (formData) => {
  console.log("service to add course ", formData);
  const response = await axios.post(`${API_URL}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const deletingCourse = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
