import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './redux/reducers/notificationReducer.js';
import alumniReducer from './redux/reducers/alumniReducer.js';

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    alumni: alumniReducer,
  },
});

export default store;
