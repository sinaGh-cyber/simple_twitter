import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TweetList from '../../model/tweetList/tweetList';
import Default from '../../Layout/Default';
import { feedActions } from '../../store';

const Thread = () => {
  const { tweetId } = useParams();
  const dispatch = useDispatch();

  const refresher = () => {
    dispatch(feedActions.fetchThread(tweetId));
  };

  useEffect(() => {
    refresher();
  }, [tweetId]);

  return (
    <Default refreshHandler={refresher} pageName={'رشته توییت'}>
      <TweetList />
    </Default>
  );
};

export default Thread;
