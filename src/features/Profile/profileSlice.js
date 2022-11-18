import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { httpRequest } from '../../services/httpRequest';

const initialState = { followers: [], followings: [], id: '', username: '' };

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (username) => {
    const response = await httpRequest.getUser(username);
    return response.data;
  }
);

export const followNewUser = createAsyncThunk(
  'profile/followNewUser',
  async (username) => {
    const response = await httpRequest.follow(username);
    return response.data;
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProfile.pending]: (state, action) => {
      state.followers = [];
      state.followings = [];
      state.id = '';
      state.username = [];
    },

    [fetchProfile.fulfilled]: (state, action) => {

      const { followers, followings, id, username } = action.payload;

      state.followers = followers;
      state.followings = followings;
      state.id = id;
      state.username = username;
    },

    [fetchProfile.rejected]: (state, action) => {

      state.followers = [];
      state.followings = [];
      state.id = '';
      state.username = [];
      toast.error('اتصال اینترنت خود را بررسی کنید.', {
        toastId: 'fetchProfileRejected',
      });
    },


    [followNewUser.pending]: (state, action) => {

      state.followings.push({ username: action.meta.arg });
    },

    [followNewUser.rejected]: (state, action) => {

      state.followings = state.followings.filter((following) => {
        following.username !== action.meta.arg;
      });
    },
  },
});
