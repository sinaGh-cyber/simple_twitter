import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
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
import {
  profileSlice,
  fetchProfile,
  followNewUser,
} from './features/Profile/profileSlice';
import { tweetSlice, postTweet } from './features/Tweet/TweetSlice';
import { toast } from 'react-toastify';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: fetchAth.fulfilled,
  effect: (_, { dispatch, getState }) => {
    dispatch(fetchCurrentUser(getState().auth.username));
  },
});
listenerMiddleware.startListening({
  predicate: (action, currState, prevState) =>
    action?.error?.message === 'Request failed with status code 403',
  effect: (_, { dispatch }) => {
    toast.dismiss();
    dispatch(authSlice.actions.logout());
    toast.error('لطفا دوباره وارد شدوید.');
  },
});

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
    getDefaultMiddleware()
      .concat(localStorageMiddleware)
      .concat(listenerMiddleware.middleware),
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
  followNewUser,
};
