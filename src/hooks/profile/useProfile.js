import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../../store';

export const useProfile = ()=>{

    const { username } = useParams();
    const loggedInUserProfile = useSelector((state) => state.loggedInUserProfile);
   
  
    const dispatch = useDispatch();
    const isCurrentUserIsLoggedInUser = username === loggedInUserProfile.username;
    const getUserHandler = () => {
        if (username !== ':username') {
          dispatch(profileActions.fetchProfile(username));
        }
      };
   
    

    return { username, loggedInUserProfile, dispatch, isCurrentUserIsLoggedInUser, getUserHandler}

}