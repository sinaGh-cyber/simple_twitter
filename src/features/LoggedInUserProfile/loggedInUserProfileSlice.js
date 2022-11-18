import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser } from '../Auth/authSlice';
import { followNewUser } from '../Profile/profileSlice';

const initialState = { followers: [], followings: [], id: '', username: '' };

export const loggedInUserProfileSlice = createSlice({
  name: 'currentUserProfile',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrentUser.pending]: (state, action) => {
      state.followers = [];
      state.followings = [];
      state.id = '';
      state.username = [];
    },

    [fetchCurrentUser.fulfilled]: (state, action) => {
      const { followers, followings, id, username } = action.payload;

      state.followers = followers;
      state.followings = followings;
      state.id = id;
      state.username = username;
    },

    [fetchCurrentUser.rejected]: (state, action) => {
      state.followers = [];
      state.followings = [];
      state.id = '';
      state.username = [];
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
