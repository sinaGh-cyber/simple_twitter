import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import Default from '../../Layout/Default';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { profileActions } from '../../store';
import { BiUserCircle } from 'react-icons/bi';

const Profile = () => {
  const { username } = useParams();
  const loggedInUserProfile = useSelector((state) => state.loggedInUserProfile);
  const currentUserProfile = useSelector((state) => state.profile);
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserAlreadyFollowed = loggedInUserProfile.followings.reduce(
    (prev, current) => {
      return prev || current.username === username;
    },
    false
  );
  const isCurrentUserIsLoggedInUser = username === loggedInUserProfile.username;
  const isCurrentUserFollowingLoggedInUser =
    loggedInUserProfile.followers.reduce((prev, current) => {
      return prev || current.username === username;
    }, false);

  const getUserHandler = () => {
    if (username !== ':username') {
      dispatch(profileActions.fetchProfile(username));
    }
  };

  useEffect(() => {
    if (username === ':username') {
      navigate(`/user/${loggedInUserProfile.username}`);
    }
  }, []);

  useEffect(() => {
    getUserHandler();
  }, [username]);
  return (
    <Default
      refreshHandler={() => {
        getUserHandler;
      }}
      pageName={`پروفایل ${isCurrentUserIsLoggedInUser ? 'من' : username}`}
    >
      <div>
        <div className=" flex flex-col items-center gap-3  bg-gray-ExtraLight p-4">
          <div
            dir="ltr"
            className="flex flex-col gap-2 justify-center items-center"
          >
            <div className="text-8xl ">
              <BiUserCircle />
            </div>
            <div className="flex justify-between gap-10">
              {!isCurrentUserIsLoggedInUser && (
                <button
                  onClick={() => {
                    dispatch(profileActions.followNewUser(username));
                  }}
                  disabled={isUserAlreadyFollowed}
                  className={`p-2 bg-white text-black rounded-2xl font-bold ${
                    !isUserAlreadyFollowed && 'bg-black text-white'
                  }`}
                >
                  {isUserAlreadyFollowed ? 'following' : 'follow'}
                </button>
              )}

              <span className="font-bold text-xl px-6 py-2 tracking-wide  ">
                {username}
              </span>
            </div>

            <div className="flex gap-5 items-center">
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? 'bg-black text-white font-bold text-lg p-2 rounded-md'
                    : 'font-bold text-lg p-2 rounded-md';
                }}
                to={'followings'}
              >
                {currentUserProfile.followings.length} :دنبال شونده ها
              </NavLink>
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? 'bg-black text-white font-bold text-lg p-2 rounded-md'
                    : 'font-bold text-lg p-2 rounded-md';
                }}
                to={'followers'}
              >
                {' '}
                {currentUserProfile.followers.length} :دنبال کننده ها{' '}
              </NavLink>
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? 'bg-black text-white font-bold text-lg p-2 rounded-md'
                    : 'font-bold text-lg p-2 rounded-md';
                }}
                to={'tweets'}
              >
                {feed.tweets.length} :توییت ها
              </NavLink>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </Default>
  );
};

export default Profile;
