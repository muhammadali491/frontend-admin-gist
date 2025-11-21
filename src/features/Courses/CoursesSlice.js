import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewCourse,
  deletingCourse,
  getCourses,
  updateCourse,
} from "../../services/courseService";

const initialState = {
  courses: [],
  status: "idle",
  error: null,
};

// thunk to fetch courses from backend
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const data = await getCourses();
    return data;
  }
);
export const editCourse = createAsyncThunk(
  "courses/editCourses",
  async (updatedCourse) => {
    const data = await updateCourse(updatedCourse);
    return data;
  }
);
export const addCourse = createAsyncThunk(
  "courses/addCourses",
  async (addedCourse) => {
    const data = await addNewCourse(addedCourse);
    return data;
  }
);
// Update one faculty member
export const deleteCourse = createAsyncThunk(
  "faculty/deleteCourse",
  async (deletedCourse) => {
    const data = await deletingCourse(deletedCourse);
    return data;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        // Handle loading state if needed
        console.log("Fetching courses...");
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        // Handle successful fetch
        console.log("Courses fetched successfully:", action.payload);
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        // Handle error state if needed
        state.status = "failed";
        console.error("Failed to fetch courses:", action.error.message);
      })
      .addCase(addCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If your API returns the created faculty item directly:
        state.faculty?.data?.faculty?.push(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If your API returns the created faculty item directly:
        state.faculty?.data?.faculty?.push(action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCourses } = courseSlice.actions;

export default courseSlice;
