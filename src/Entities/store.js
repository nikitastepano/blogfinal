import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './articleSlice'
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer,
  },
})