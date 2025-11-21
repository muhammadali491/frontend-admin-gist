import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewFaculty,
  deletingFaculty,
  getFaculty,
  updateFaculty,
} from "../../services/facultyService";

const initialState = {
  faculty: [],
  status: "idle",
  error: null,
};

// Fetch all faculty members
export const fetchFaculty = createAsyncThunk(
  "faculty/fetchFaculty",
  async () => {
    const data = await getFaculty();
    return data;
  }
);

// Update one faculty member
export const editFaculty = createAsyncThunk(
  "faculty/editFaculty",
  async (updatedFaculty) => {
    const data = await updateFaculty(updatedFaculty);
    return data;
  }
);
// Update one faculty member
export const addFaculty = createAsyncThunk(
  "faculty/addFaculty",
  async (addedFaculty) => {
    const data = await addNewFaculty(addedFaculty);
    return data;
  }
);
// Update one faculty member
export const deleteFaculty = createAsyncThunk(
  "faculty/deleteFaculty",
  async (deletedFaculty) => {
    const data = await deletingFaculty(deletedFaculty);
    return data;
  }
);

const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    setFaculty: (state, action) => {
      state.faculty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaculty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFaculty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.faculty = action.payload;
      })
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editFaculty.fulfilled, (state, action) => {
        const updated = action.payload;
        const facultyArray = state.faculty?.data?.faculty;
        const index = facultyArray.findIndex((f) => f._id === updated._id);
        if (index !== -1) {
          facultyArray[index] = updated;
        }
      })
      .addCase(addFaculty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFaculty.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If your API returns the created faculty item directly:
        state.faculty?.data?.faculty?.push(action.payload);
      })
      .addCase(addFaculty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteFaculty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFaculty.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If your API returns the created faculty item directly:
        state.faculty?.data?.faculty?.push(action.payload);
      })
      .addCase(deleteFaculty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFaculty } = facultySlice.actions;
export default facultySlice;
