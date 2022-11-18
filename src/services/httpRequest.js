import axios from 'axios';
import { store } from '../store';

axios.defaults.baseURL = 'http://127.0.0.1:4000';

export const httpRequest = {
  signUp(body) {
    return axios.post('api/signup/', body);
  },

  login(body) {
    return axios.post('api/login/', body);
  },

  tweet(tweet) {
    const headers = { jwt: store.getState().auth.token };

    return axios.post('api/tweet', tweet, {
      headers,
    });
  },

  getFeed() {
    const headers = { jwt: store.getState().auth.token };

    return axios.post(
      'api/feed/',
      {},
      {
        headers,
      }
    );
  },

  getUser(username) {
    return axios.get(`api/user/${username}/`);
  },

  getThread(tweet_id) {
    return axios.get(`/api/tweets/${tweet_id}`);
  },

  like(tweet_id) {
    const headers = { jwt: store.getState().auth.token };

    return axios.put(
      'api/like/',
      { tweet_id },
      {
        headers,
      }
    );
  },

  follow(username) {
    const headers = { jwt: store.getState().auth.token };

    return axios.put(
      'api/follow/',
      { username },
      {
        headers,
      }
    );
  },

  deleteTweet(tweet_id) {
    const headers = { jwt: store.getState().auth.token };

    // return axios.delete(
    //   'api/delete_tweet/',
    //   { tweet_id },
    //   {
    //     headers,
    //   }
    // );

    return axios.delete('api/delete_tweet/', {
      headers,
      data: {
        tweet_id,
      },
    });
  },
};
