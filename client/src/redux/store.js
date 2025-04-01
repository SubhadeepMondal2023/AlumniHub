import { configureStore } from '@reduxjs/toolkit';
import { alumniApi } from './api/alumniApiSlice';
import { notificationsApi } from './api/notificationsApiSlice';
import { authApi } from "./api/authSlice.js";
import { jobApiSlice } from './api/jobApiSlice.js';
import { donationApi } from './api/donationApiSlice.js';

const store = configureStore({
  reducer: {
    [alumniApi.reducerPath]: alumniApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobApiSlice.reducerPath]: jobApiSlice.reducer,
    [donationApi.reducerPath]: donationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      alumniApi.middleware, 
      notificationsApi.middleware, 
      authApi.middleware,
      jobApiSlice.middleware,
      donationApi.middleware
    ),
});

export default store;
