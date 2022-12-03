import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { httpRequest } from '../../services/httpRequest';
import {  fetchFeed } from '../feed/feedSlice';


const initialState = { token: '', username: ''};

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
       
    },
  },
  extraReducers: {
    [fetchAth.pending]: (state) => {
      state.token = '';
      state.username = '';
       

      toast.dismiss('login');
      toast.loading('صبر کنید...', {
        toastId: 'login',
      });
    },

    [fetchAth.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.username = action.meta.arg.username;
       
    },

    [fetchAth.rejected]: (state) => {
      state.token = '';
      state.username = '';
       
      toast.update('login', {
        render: 'نام کاربری یا کلمه ی عبور اشتباه است.',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    },


    [fetchCurrentUser.fulfilled]: (state, action) => {
      toast.update('login', {
        render: `خوش آمدید ${state.username} عزیز`,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    },

    [fetchCurrentUser.rejected]: (state) => {
      state.token = '';
      state.username = '';
       

      toast.update('login', {
        render: 'انتصال اینترنت خود را بررسی کنید.',
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
         
        toast.error('لطفا دوباره وارد شدوید.', { toastId: 'feedReject403' });
      }
    },
  },
});
