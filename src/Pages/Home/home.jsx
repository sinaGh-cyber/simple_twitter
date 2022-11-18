import Default from '../../Layout/Default';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { feedActions } from '../../store';
import TweetList from '../../modules/tweetList/tweetList';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedActions.fetchFeed());
  }, []);

  return (
    <Default
      pageName="خانه"
      refreshHandler={() => dispatch(feedActions.fetchFeed())}
    >
      <TweetList />
    </Default>
  );
};

export default Home;
