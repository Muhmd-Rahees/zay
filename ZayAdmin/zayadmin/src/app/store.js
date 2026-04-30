import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../feature/authSlice";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
  },
});

export default store;
