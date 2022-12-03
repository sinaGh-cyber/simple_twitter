import Default from '../../Layout/Default';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { feedActions } from '../../store';
import TweetList from '../../model/tweetList/tweetList';

const Home = () => {
  const dispatch = useDispatch();
  
 const refresher = () => dispatch(feedActions.fetchFeed());

  useEffect(() => {
    refresher()
  }, []);

  return (
    <Default
      pageName="خانه"
      refreshHandler={refresher}
    >
      <TweetList />
    </Default>
  );
};

export default Home;
