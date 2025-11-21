import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../features/Courses/CoursesSlice";
import galleryReducer from "../features/Gallery/GallerySlice";
import facultySlice from "../features/Faculty/FacultySlice";
import adminSlice from "../features/Admins/AdminSlice";
import joinSlice from "../features/Join/JoinSlice";
import messageSlice from "../features/Message/MessageSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer.reducer,
    gallery: galleryReducer.reducer,
    faculty: facultySlice.reducer,
    admin: adminSlice.reducer,
    join: joinSlice.reducer,
    message: messageSlice.reducer,
  },
});
