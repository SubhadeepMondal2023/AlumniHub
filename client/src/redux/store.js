import { configureStore } from '@reduxjs/toolkit';
import { alumniApi } from './api/alumniApiSlice';
import { notificationsApi } from './api/notificationsApiSlice';

const store = configureStore({
  reducer: {
    [alumniApi.reducerPath]: alumniApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(alumniApi.middleware, notificationsApi.middleware),
});

export default store;
