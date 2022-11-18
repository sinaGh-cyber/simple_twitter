import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  fetchAth,
  fetchCurrentUser,
} from './features/Auth/authSlice';
import { loggedInUserProfileSlice } from './features/LoggedInUserProfile/loggedInUserProfileSlice';
import {
  feedSlice,
  fetchFeed,
  likeTweet,
  deleteTweet,
  fetchThread,
} from './features/feed/feedSlice';
import { profileSlice, fetchProfile, followNewUser } from './features/Profile/profileSlice';
import { tweetSlice, postTweet } from './features/Tweet/TweetSlice';

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem(
      'applicationStateAuth',
      JSON.stringify(getState().auth)
    );
    localStorage.setItem(
      'applicationStateLoggedInUserProfile',
      JSON.stringify(getState().loggedInUserProfile)
    );
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('applicationStateAuth') !== null) {
    return {
      auth: JSON.parse(localStorage.getItem('applicationStateAuth')),
      loggedInUserProfile: JSON.parse(
        localStorage.getItem('applicationStateLoggedInUserProfile')
      ),
    }; // re-hydrate the store
  }
};

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    feed: feedSlice.reducer,
    tweet: tweetSlice.reducer,
    profile: profileSlice.reducer,
    loggedInUserProfile: loggedInUserProfileSlice.reducer,
  },

  preloadedState: reHydrateStore(),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export const authActions = {
  login: fetchAth,
  getCurrentUserId: fetchCurrentUser,
  ...authSlice.actions,
};

export const tweetActions = {
  ...tweetSlice.actions,
  postTweet,
};

export const feedActions = {
  ...feedSlice.actions,
  fetchFeed,
  likeTweet,
  deleteTweet,
  fetchThread,
};

export const profileActions = {
  ...profileSlice.actions,
  fetchProfile,
  followNewUser
};