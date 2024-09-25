import { createSlice } from "@reduxjs/toolkit";

const initialLang = sessionStorage.getItem("lang") || "ar";

export const language = createSlice({
  name: "language",
  initialState: {
    lang: initialLang,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      sessionStorage.setItem("lang", action.payload);
    },
  },
});

export const { setLanguage } = language.actions;
export default language.reducer;
