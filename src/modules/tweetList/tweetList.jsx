import { useSelector } from 'react-redux';
import TweetBox from '../tweetBox/tweetBox';
import LoadingAnimation from '../../components/loadingAnimation/loadingAnimation';

const TweetList = () => {
  const feed = useSelector((state) => state.feed);

  return (
    <ul className="flex  flex-1 justify-center items-center flex-col my-2 relative  ">
      {feed.isLoading ? (
        <LoadingAnimation />
      ) : feed.tweets.length ? (
        feed.tweets.map((tweet) => {
          return <TweetBox key={tweet.id} {...tweet} />;
        })
      ): (<p className='p-2 bg-blue text-white mt-40 rounded-md' >توییتی برای نمایش وجود ندارد.</p>)}
    </ul>
  );
};

export default TweetList;
