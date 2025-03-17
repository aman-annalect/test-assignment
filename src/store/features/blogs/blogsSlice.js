import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return response.data;
});

export const getSinglePost = createAsyncThunk(
  'data/getSinglePost',
  async (postId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return response.data;
  }
);

const blogsSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getSinglePost.pending, (state) => {
        state.singlePostStatus = 'loading';
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.singlePost = action.payload;
        state.singlePostStatus = 'succeeded';
      })
      .addCase(getSinglePost.rejected, (state) => {
        state.singlePostStatus = 'failed';
      });
  },
});

export default blogsSlice.reducer;
