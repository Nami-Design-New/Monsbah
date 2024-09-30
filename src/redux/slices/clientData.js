import { createSlice } from "@reduxjs/toolkit";

export const clientData = createSlice({
  name: "clientData",
  initialState: {
    city: {},
    state: {},
    country: {},
    clientData: {}
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setUserState: (state, action) => {
      state.state = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setClientData: (state, action) => {
      state.clientData = action.payload;
    }
  }
});

export const { setCity, setUserState, setCountry, setClientData } =
  clientData.actions;
export default clientData.reducer;
