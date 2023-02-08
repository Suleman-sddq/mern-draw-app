import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import drawReducers from '../features/draw/drawSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    draw: drawReducers
  },
});
