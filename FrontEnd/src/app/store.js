import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },

  /* the use of RTK Query with the store require a middleware:  getDefaultMiddleware : default with redux  
  apiSlice.middleware: manages cache lifetimes and expirations and it is required to use it   when we're using RTK Query and Api Slice */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

//To refresh and update data
setupListeners(store.dispatch);
