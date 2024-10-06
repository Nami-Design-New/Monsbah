import { createSlice } from "@reduxjs/toolkit";

export const clientData = createSlice({
  name: "clientData",
  initialState: {
    client: {}
  },
  reducers: {
    setClientData: (state, action) => {
      state.client = action.payload;
    }
  }
});

export const { setClientData } = clientData.actions;
export default clientData.reducer;
