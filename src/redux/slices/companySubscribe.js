import { createSlice } from "@reduxjs/toolkit";

export const companySubscribe = createSlice({
  name: "companySubscribe",
  initialState: {
    showModal: false,
  },
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setShowModal } = companySubscribe.actions;
export default companySubscribe.reducer;
