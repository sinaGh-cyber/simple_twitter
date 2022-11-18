#simple-twitter

This project is a simple and minimal clone of Twitter created using React.js. It was done as a challenge from [@QueraTeam](https://github.com/QueraTeam) React Bootcamp.

## Backend

[The original backend](https://github.com/mhyrzt/rest-twitter-nodejs) of QTwitter was made by [@mhyrzt](https://github.com/mhyrzt) using Express.js. This QTwitter client uses a forked version of the said backend. The backend server relies on Express.js framework and MongoDB as its database.
my friend Ali Hajeb fixed some bugs in original QTwiiter's backend and I used it as my backend in this project.
for more instructions on how to set up the server, visit the [backend repository](https://github.com/ali-hajeb/rest-twitter-nodejs).

## Set up

To run this client,
1. you need to clone and run the [backend server](https://github.com/ali-hajeb/rest-twitter-nodejs).
2. create a `.env` file in the root directory of `./qtwitter-reactjs` (client) containing backend server URL (i.e. http://localhost:4000) with the `REACT_APP_API_URL` key.

`~/.env`:
```shell
REACT_APP_API_URL = 'http://localhost:4000'