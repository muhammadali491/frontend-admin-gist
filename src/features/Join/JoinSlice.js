import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletingJoin, getJoin, updateJoin } from "../../services/joinService";

const initialState = {
  join: [],
  status: "idle",
  error: null,
};

// thunk to fetch join from backend
export const fetchJoin = createAsyncThunk("join/fetchJoin", async () => {
  const data = await getJoin();
  return data;
});

// Update one Gallery member
export const editJoin = createAsyncThunk(
  "join/editJoin",
  async (updatedJoin) => {
    const data = await updateJoin(updatedJoin);
    return data;
  }
);

export const deletedJoin = createAsyncThunk(
  "join/deletedJoin",
  async (deletedJoin) => {
    const data = await deletingJoin(deletedJoin);
    return data;
  }
);

const joinSlice = createSlice({
  name: "join",
  initialState,
  reducers: {
    setJoin: (state, action) => {
      state.join = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoin.pending, (state) => {
        // Handle loading state if needed
        console.log("Fetching Join...");
        state.status = "loading";
      })
      .addCase(fetchJoin.fulfilled, (state, action) => {
        // Handle successful fetch
        console.log("Join fetched successfully:", action.payload);
        state.status = "succeeded";
        state.join = action.payload;
      })
      .addCase(fetchJoin.rejected, (state, action) => {
        // Handle error state if needed
        state.status = "failed";
        console.error("Failed to fetch Join:", action.error.message);
      })
      .addCase(deletedJoin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletedJoin.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If your API returns the created join item directly:
        state.join?.data?.join?.push(action.payload);
      })
      .addCase(deletedJoin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setJoin } = joinSlice.actions;

export default joinSlice;
