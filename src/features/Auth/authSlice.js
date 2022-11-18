import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { httpRequest } from '../../services/httpRequest';
import { deleteTweet, fetchFeed, likeTweet } from '../feed/feedSlice';
import { followNewUser } from '../Profile/profileSlice';
import { postTweet } from '../Tweet/TweetSlice';

const initialState = { token: '', username: '', userId: '' };

export const fetchAth = createAsyncThunk('auth/fetchAuth', async (body) => {
  const response = await httpRequest.login(body);
  return response.data;
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (username) => {
    const response = await httpRequest.getUser(username);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = '';
      state.username = '';
      state.userId = '';
    },
  },
  extraReducers: {
    [fetchAth.pending]: (state) => {
      state.token = '';
      state.username = '';
      state.userId = '';

      toast.dismiss('login');
      toast.loading('صبر کنید...', {
        toastId: 'login',
      });
    },

    [fetchAth.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.username = action.meta.arg.username;
      state.userId = '';
    },

    [fetchAth.rejected]: (state) => {
      state.token = '';
      state.username = '';
      state.userId = '';
    },

    [fetchCurrentUser.pending]: (state) => {
      state.userId = '';
    },

    [fetchCurrentUser.fulfilled]: (state, action) => {
      if (!state.token && !state.username) {
        console.log('fail');
        state.token = '';
        state.username = '';
        state.userId = '';

        toast.update('login', {
          render: 'نام کاربری یا کلمه ی عبور اشتباه است.',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
      } else {
        state.userId = action.payload.id;
        toast.update('login', {
          render: `خوش آمدید ${state.username} عزیز`,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    },

    [fetchCurrentUser.rejected]: (state) => {
      state.token = '';
      state.username = '';
      state.userId = '';

      toast.update('login', {
        render: 'نام کاربری یا کلمه ی عبور اشتباه است.',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    },

    [fetchFeed.rejected]: (state, action) => {
      if (action.error.message === 'Request failed with status code 403') {
        state.token = '';
        state.username = '';
        state.userId = '';
        toast.error('لطفا دوباره وارد شدوید.', { toastId: 'feedReject403' });
      }
    },
    [likeTweet.rejected]: (state, action) => {
      if (action.error.message === 'Request failed with status code 403') {
        state.token = '';
        state.username = '';
        state.userId = '';
        toast.error('لطفا دوباره وارد شدوید.');
      }
    },
    [deleteTweet.rejected]: (state, action) => {
      if (action.error.message === 'Request failed with status code 403') {
        state.token = '';
        state.username = '';
        state.userId = '';
        toast.error('لطفا دوباره وارد شدوید.');
      }
    },
    [postTweet.rejected]: (state, action) => {
      if (action.error.message === 'Request failed with status code 403') {
        state.token = '';
        state.username = '';
        state.userId = '';

        toast.update('tweetToast', {
          render: 'لطفا دوباره وارد شدوید.',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    },

    [followNewUser.rejected]: (state, action) => {
      if (action.error.message === 'Request failed with status code 403') {
        state.token = '';
        state.username = '';
        state.userId = '';
        toast.error('لطفا دوباره وارد شدوید.', { toastId: 'feedReject403' });
      }
    },
  },
});
