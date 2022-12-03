import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense } from 'react';
import LoadingAnimation from './components/loadingAnimation/loadingAnimation';
import TweetModal from './model/tweetModal/tweetModal';

const Home = lazy(() => import('./Pages/Home/home'));
const Login = lazy(() => import('./Pages/Login/login'));
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'));
const Profile = lazy(() => import('./Pages/Profile/profile'));
const SignUp = lazy(() => import('./Pages/Signup/signup'));
const Thread = lazy(() => import('./Pages/Thread/thread'));
const Search = lazy(() => import('./Pages/Search/search'));
const Followings = lazy(() => import('./Pages/Profile/Followings/followings'));
const Followers = lazy(() => import('./Pages/Profile/Followers/followers'));
const TweetList = lazy(() => import('./model/tweetList/tweetList'));

function App() {
  const isTweetModalActive = useSelector(
    (state) => state.tweet.isTweetModalActive
  );

  return (
    <div className="flex relative flex-col justify-center items-center w-screen min-h-screen bg-gray-ExtraExtraLight">
      {isTweetModalActive && <TweetModal />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense fallback={<LoadingAnimation />}>
        <Routes>
          <Route
            path={'/home'}
            element={
              <Protected path="/home">
                <Home />
              </Protected>
            }
            key="0"
          />
          
          <Route
            path={'/thread/:tweetId'}
            element={
              <Protected path="/thread/:tweetId">
                <Thread />
              </Protected>
            }
            key="1"
          />
          <Route
            path={'/user/:username'}
            element={
              <Protected path="/user/:username">
                <Profile />
              </Protected>
            }
            key="2"
          >
            <Route path={'followings'} element={<Followings />} key="21" />
            <Route path={'followers'} element={<Followers />} key="22" />
            <Route path={'tweets'} element={<TweetList />} key="23" />
          </Route>
          <Route path={'/login'} element={<Login />} key="3" />
          <Route index element={<Login />} key="4" />
          <Route path={'/sign-up'} element={<SignUp />} key="5" />
          <Route path={'*'} element={<NotFound />} key="6" />{' '}
          <Route
            path={'/search'}
            element={
              <Protected path="/search">
                <Search />
              </Protected>
            }
            key="7"
          />
        </Routes>{' '}
      </Suspense>
    </div>
  );
}

export default App;

function Protected({ children, path }) {
  const isLoggedIn = useSelector((state) => state.auth.token);

  if (!isLoggedIn) {
    return <Navigate to={`/login?redirect=${path}`} replace />;
  }
  return children;
}
