// src/redux/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin } from "../../services/adminService";

// Async thunk for login
export const login = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginAdmin(credentials);
      return data; // { admin, token }
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

const initialState = {
  admin: null,
  token: localStorage.getItem("adminToken") || null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.status = "idle";
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload.admin;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice;
