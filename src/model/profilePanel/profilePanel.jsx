import {useNavigate} from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { profileActions } from '../../store';
import { BiUserCircle } from 'react-icons/bi';
import { useProfile } from '../../hooks/profile/useProfile';
import ProfilePanelNavLink from './profilePanelNavLink';

const ProfilePanel = () => {
  const currentUserProfile = useSelector((state) => state.profile);
  const feed = useSelector((state) => state.feed);
  const {
    loggedInUserProfile,
    username,
    isCurrentUserIsLoggedInUser,
    getUserHandler
  } = useProfile();
  const navigate = useNavigate();

  const isUserAlreadyFollowed = loggedInUserProfile.followings.reduce(
    (prev, current) => {
      return prev || current.username === username;
    },
    false
  );


  

  useEffect(() => {
      if (username === ':username') {
        navigate(`/user/${loggedInUserProfile.username}/tweets`);
      }
    }, []);
  
    useEffect(() => {
      getUserHandler();
    }, [username]);

  return (
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
          <ProfilePanelNavLink
            to="followings"
            count={currentUserProfile.followings.length}
            showText=":دنبال شونده ها"
          />
          <ProfilePanelNavLink
            to="followers"
            count={currentUserProfile.followers.length}
            showText=":دنبال کننده ها"
          />
          <ProfilePanelNavLink
            to="tweets"
            count={feed.tweets.length}
            showText=':توییت ها'
          />

        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
