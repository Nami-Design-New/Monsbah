import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/language";

export const store = configureStore({
  reducer: {
    language
  }
});
