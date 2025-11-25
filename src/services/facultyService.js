import axios from "axios";

// const API_URL = "http://localhost:5000/api/faculty";
const API_URL = `${import.meta.env.VITE_API_URL}/api/faculty`;

// Fetch all faculty
export const getFaculty = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateFaculty = async (formData) => {
  const id = formData.get("_id");
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const addNewFaculty = async (formData) => {
  console.log("Ready to send formdata to backend ", formData);
  const response = await axios.post(`${API_URL}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const deletingFaculty = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
