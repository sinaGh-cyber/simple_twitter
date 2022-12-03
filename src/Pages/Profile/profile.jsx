import { Outlet } from 'react-router-dom';
import { useProfile } from '../../hooks/profile/useProfile';
import Default from '../../Layout/Default';
import ProfilePanel from '../../model/profilePanel/profilePanel';

const Profile = () => {
  const { getUserHandler, isCurrentUserIsLoggedInUser, username } =
    useProfile();

  return (
    <Default
      refreshHandler={getUserHandler}
      pageName={`پروفایل ${isCurrentUserIsLoggedInUser ? 'من' : username}`}
    >
      <div>
        <ProfilePanel/>
        <Outlet />
      </div>
    </Default>
  );
};

export default Profile;
