import { configureStore } from '@reduxjs/toolkit';
import adsReducer from './adsReducer';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    ads: adsReducer,
    user: userReducer,
  },
});

export default store;