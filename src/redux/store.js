import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/language";
import clientData from "./slices/clientData";

export const store = configureStore({
  reducer: {
    language,
    clientData
  }
});
