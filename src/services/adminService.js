// src/services/adminService.js
import axios from "axios";
import Swal from "sweetalert2";
// const API_URL = "http://localhost:5000/api/admin"; // your backend URL
const API_URL = `${import.meta.env.VITE_API_URL}/api/admin`; // your backend URL
// const API_URL = "/api/admin";

// Login function
export const loginAdmin = async (credentials) => {
  // console.log("sending data ", credentials);
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    if (response.data.token) {
      // Save JWT token to localStorage
      Swal.close();
      localStorage.setItem("adminToken", response.data.token);
    }

    return response.data; // contains admin info + token
  } catch (error) {
    // Forward backend error
    throw error.response ? error.response.data : { message: error.message };
  }
};

// Optional: logout function
export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
};
