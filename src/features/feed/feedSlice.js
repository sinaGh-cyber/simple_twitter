import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { httpRequest } from '../../services/httpRequest';
import { fetchProfile } from '../Profile/profileSlice';

const initialState = { tweets: [], username: '', isLoading: false };

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () => {
  const response = await httpRequest.getFeed();
  return response.data;
});

export const fetchThread = createAsyncThunk(
  'feed/fetchThread',
  async (tweet_id) => {
    const response = await httpRequest.getThread(tweet_id);
    return response.data;
  }
);

export const likeTweet = createAsyncThunk('feed/likeTweet', async (reqData) => {
  const response = await httpRequest.like(reqData.tweetId);
  return response.data;
});
export const deleteTweet = createAsyncThunk('feed/deleteTweet', async (id) => {
  const response = await httpRequest.deleteTweet(id);

  return response.data;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFeed.pending]: (state) => {
      state.tweets = [];
      state.username = '';
      state.isLoading = true;
    },

    [fetchFeed.fulfilled]: (state, action) => {
      state.tweets = action.payload.tweets.reverse().filter((tweet) => {
        return !tweet.reply;
      });
      state.username = action.payload.username;
      state.isLoading = false;
    },

    [fetchFeed.rejected]: (state, action) => {
      state.tweets = [];
      state.isLoading = false;
      if (action.error.message !== 'Request failed with status code 403') {
        toast.error('اتصال خود به اینترنت را چک کنید!', {
          toastId: 'fetchFeedRejected',
        });
      }
    },

    [fetchThread.pending]: (state) => {
      state.tweets = [];
      state.isLoading = true;
    },

    [fetchThread.fulfilled]: (state, action) => {
      const { tweet_id, thread } = action.payload;

      const mainTweetIsReplyTo = thread.filter((tweet) => {
        return tweet.reply !== tweet_id && tweet.id !== tweet_id;
      });

      const mainTweet = thread.filter((tweet) => {
        return tweet.id === tweet_id;
      });
      mainTweet[0].isThreadHead = true;

      const replyToMainTweets = thread.filter((tweet) => {
        return tweet.reply === tweet_id;
      });

      const reArrangedThread = [
        ...mainTweetIsReplyTo,
        ...mainTweet,
        ...replyToMainTweets,
      ];

      state.tweets = reArrangedThread;
      state.isLoading = false;
    },

    [fetchThread.rejected]: (state) => {
      state.tweets = [];
      state.isLoading = false;
      toast.error('اتصال خود به اینترنت را چک کنید!', {
        toastId: 'fetchThreadRejected',
      });
    },

    [deleteTweet.pending]: (state, action) => {
      state.isLoading = true;
    },

    [deleteTweet.fulfilled]: (state, action) => {
      state.tweets = state.tweets.filter((tweet) => {
        return tweet.id !== action.meta.arg;
      });

      state.isLoading = false;
      toast.info('توییت مورد نظر با موفقیت حذف شد.', {
        toastId: 'deleteTweetFulfilled',
      });
    },

    [deleteTweet.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.error.message !== 'Request failed with status code 403') {
        toast.error('اتصال اینترنت خود را چک کنید.', {
          toastId: 'deleteTweetRejected',
        });
      }
    },

    [likeTweet.pending]: (state, action) => {
      const likedTweet = state.tweets.find((tweet) => {
        return tweet.id === action.meta.arg.tweetId;
      });
      if (likedTweet) {
        likedTweet.favcount += 1;
        likedTweet.favorites.push(action.meta.arg.currentLoggedInUserId);
      }
    },

    [likeTweet.rejected]: (state, action) => {
      const likedTweet = state.tweets.find((tweet) => {
        return tweet.id === action.meta.arg.tweetId;
      });
      if (likedTweet) {
        likedTweet.favcount -= 1;
        likedTweet.favorites = likedTweet.favorites.filter((likerId) => {
          likerId !== action.meta.arg.currentLoggedInUserId;
        });
      }
    },

    [fetchProfile.pending]: (state, action) => {
      state.tweets = [];
      state.isLoading = true;
    },

    [fetchProfile.fulfilled]: (state, action) => {
      state.tweets = action.payload.tweets.reverse().filter((tweet) => {
        return !tweet.reply;
      });
      state.isLoading = false;
    },

    [fetchProfile.rejected]: (state, action) => {
      state.tweets = [];
      state.isLoading = false;
    },
  },
});
