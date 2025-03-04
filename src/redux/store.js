import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/language";
import clientData from "./slices/clientData";
import companySubscribe from "./slices/companySubscribe";

export const store = configureStore({
  reducer: {
    language,
    clientData,
    companySubscribe,
  },
});
