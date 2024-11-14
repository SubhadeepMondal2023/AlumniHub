import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './redux/reducers/notificationReducer.js';

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
  },
});

export default store;
