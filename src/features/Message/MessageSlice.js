import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletingMessage, getMessage } from "../../services/messageService";

const initialState = {
  message: [],
  status: "idle",
  error: null,
};

// thunk to fetch join from backend
export const fetchMessage = createAsyncThunk(
  "message/fetchMessage",
  async () => {
    const data = await getMessage();
    return data;
  }
);

export const deletedMessage = createAsyncThunk(
  "message/deletedMessage",
  async (deletedMessage) => {
    const data = await deletingMessage(deletedMessage);
    return data;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessage.pending, (state) => {
        // Handle loading state if needed
        console.log("Fetching Message...");
        state.status = "loading";
      })
      .addCase(fetchMessage.fulfilled, (state, action) => {
        // Handle successful fetch
        console.log("Message fetched successfully:", action.payload);
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(fetchMessage.rejected, (state, action) => {
        // Handle error state if needed
        state.status = "failed";
        console.error("Failed to fetch Message:", action.error.message);
      })
      .addCase(deletedMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletedMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If your API returns the created message item directly:
        state.message?.data?.message?.push(action.payload);
      })
      .addCase(deletedMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice;
