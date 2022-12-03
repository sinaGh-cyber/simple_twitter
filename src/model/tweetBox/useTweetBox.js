import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { feedActions, tweetActions } from '../../store';

 export const useTweetBox = (id, favorites, isThreadHead,user) => {
  const dispatch = useDispatch();
  const loggedInUserProfile = useSelector((state) => state.loggedInUserProfile);
  const navigate = useNavigate();

  const replyBtnHandler = (e) => {
    e.stopPropagation();
    dispatch(tweetActions.ToggleModal(id));
  };
  const goToUserProfileBtnHandler = (e) => {
    e.stopPropagation();
    navigate(`/user/${user.username}/tweets`);
  };
  const goToThreadHeadHandler = () => {
    !isThreadHead && navigate(`/thread/${id}`);
  };
  const likeBtnHandler = (e) => {
    e.stopPropagation();
    if (!favorites.includes(loggedInUserProfile.id)) {
      dispatch(
        feedActions.likeTweet({
          tweetId: id,
          currentLoggedInUserId: loggedInUserProfile.id,
        })
      );
    }
  };
  const deleteBtnHandler = (e) => {
    e.stopPropagation();
    dispatch(feedActions.deleteTweet(id));
  };

  return {
    loggedInUserProfile,
    replyBtnHandler,
    goToUserProfileBtnHandler,
    goToThreadHeadHandler,
    likeBtnHandler,
    deleteBtnHandler,
  };
};

