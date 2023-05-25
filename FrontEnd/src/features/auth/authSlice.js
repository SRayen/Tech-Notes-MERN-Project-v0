import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      //here we are inside the auth Slice ==> state.token and not state.auth.token
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
