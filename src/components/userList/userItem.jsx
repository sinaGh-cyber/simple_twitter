import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profileActions } from '../../store';

const UserItem = ({ username, followersCount }) => {
  const navigate = useNavigate();
  const loggedInUserProfile = useSelector((state) => state.loggedInUserProfile);
  const dispatch = useDispatch();

  const isUserAlreadyFollowed = loggedInUserProfile.followings.reduce(
    (prev, current) => {
      return prev || current.username === username;
    },
    false
  );
  const isCurrentIsLoggedInUser =
    username === loggedInUserProfile.username;
  const isCurrentUserFollowingLoggedInUser = loggedInUserProfile.followers.reduce(
    (prev, current) => {
      return prev || current.username === username;
    },
    false
  );

  return (
    <li className="bg-gray-ExtraLight flex justify-between w-11/12 md:w-9/12 p-4 rounded">
      <section className="flex gap-3 items-center x">
        <span className="hidden md:inline p-2 bg-blue text-white font-medium rounded-xl">
          {`followers: ${followersCount}`}
        </span>
        {isCurrentUserFollowingLoggedInUser && (
          <span className="p-2 bg-gray-light text-white  rounded-xl">
            شما را دنبال می کند
          </span>
        )}
      </section>
      <section dir="ltr" className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/${username}/tweets`);
            }}
          >
            <span className="text-blue font-bold hover:underline">
              {`@${username}`}
            </span>
          </button>

          {isCurrentIsLoggedInUser ? (
            <span className="p-2 font-medium bg-blue text-white rounded-2xl">
              شما
            </span>
          ) : (
            <button
              onClick={() => {
                dispatch(
                  profileActions.followNewUser(username)
                );
              }}
              disabled={isUserAlreadyFollowed}
              className={`p-2 bg-white text-black rounded-2xl font-bold ${
                !isUserAlreadyFollowed && 'bg-black text-white'
              }`}
            >
              {isUserAlreadyFollowed ? 'دنبال می کنید' : 'دنبال کردن'}
            </button>
          )}
        </div>
      </section>
    </li>
  );
};

export default UserItem;
