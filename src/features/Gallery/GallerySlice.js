import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewGallery,
  deletingGallery,
  getGallery,
  updateGallery,
} from "../../services/galleryService";

const initialState = {
  gallery: [],
  status: "idle",
  error: null,
};

// thunk to fetch gallery from backend
export const fetchGallery = createAsyncThunk(
  "gallery/fetchGallery",
  async () => {
    const data = await getGallery();
    return data;
  }
);

// Update one Gallery member
export const editGallery = createAsyncThunk(
  "gallery/editGallery",
  async (updatedGallery) => {
    const data = await updateGallery(updatedGallery);
    return data;
  }
);

export const addGallery = createAsyncThunk(
  "courses/addGallery",
  async (addedGallery) => {
    const data = await addNewGallery(addedGallery);
    return data;
  }
);

export const deleteGallery = createAsyncThunk(
  "faculty/deleteGallery",
  async (deleteGallery) => {
    const data = await deletingGallery(deleteGallery);
    return data;
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        // Handle loading state if needed
        console.log("Fetching gallery...");
        state.status = "loading";
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        // Handle successful fetch
        console.log("gallery fetched successfully:", action.payload);
        state.status = "succeeded";
        state.gallery = action.payload;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        // Handle error state if needed
        state.status = "failed";
        console.error("Failed to fetch gallery:", action.error.message);
      })
      .addCase(addGallery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addGallery.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If your API returns the created faculty item directly:
        state.faculty?.data?.faculty?.push(action.payload);
      })
      .addCase(addGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteGallery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteGallery.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If your API returns the created faculty item directly:
        state.faculty?.data?.faculty?.push(action.payload);
      })
      .addCase(deleteGallery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setGallery } = gallerySlice.actions;

export default gallerySlice;
