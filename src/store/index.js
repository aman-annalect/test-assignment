import {configureStore} from '@reduxjs/toolkit';
import dataReducer from './features/blogs/blogsSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
