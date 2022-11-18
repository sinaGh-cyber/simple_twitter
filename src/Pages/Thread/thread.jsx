import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TweetList from '../../modules/tweetList/tweetList';
import Default from '../../Layout/Default';
import { feedActions } from '../../store';

const Thread = () => {
  const { tweetId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(feedActions.fetchThread(tweetId));
  }, [tweetId]);

  return (
    <Default
      refreshHandler={() => {
        dispatch(feedActions.fetchThread(tweetId));
      }}
      pageName={'رشته توییت'}
    >
      <TweetList />
    </Default>
  );
};

export default Thread;
