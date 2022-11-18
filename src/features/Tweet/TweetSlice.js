import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { httpRequest } from '../../services/httpRequest';

const initialState = {
  isTweetModalActive: false,
  isLoading: false,
  replyId: '',
};

export const postTweet = createAsyncThunk('tweet/postTweet', async (body) => {
  const response = await httpRequest.tweet(body);
  return response.data;
});

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    ToggleModal: (state, action) => {
      state.isTweetModalActive = !state.isTweetModalActive;
      state.replyId = action.payload || '';
    },
  },
  extraReducers: {
    ['auth/logout']: (state) => {
      state.isTweetModalActive = false;
      state.replyId = '';
      state.isLoading = false;
    },
    [postTweet.pending]: (state, action) => {
      state.isLoading = true;

      toast.dismiss('tweetToast');
      toast.loading('صبر کنید...', {
        toastId: 'tweetToast',
      });
    },

    [postTweet.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.reducers = '';
      state.isTweetModalActive = false;

      toast.update('tweetToast', {
        render: 'توییت شما با موفقیت ارسال شد.',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    },

    [postTweet.rejected]: (state, action) => {
      state.isLoading = false;
      state.isTweetModalActive = true;

      if (action.error.message !== 'Request failed with status code 403') {
        toast.update('tweetToast', {
          render: 'مشکلی هنگام ارسال توییت پیش آمد!',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    },
  },
});
