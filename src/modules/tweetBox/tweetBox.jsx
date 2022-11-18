import { useSelector, useDispatch } from 'react-redux';
import { feedActions, tweetActions } from '../../store';
import { BsFillReplyFill } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { AiTwotoneLike } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const TweetBox = ({ body, favcount, id, favorites, user, isThreadHead }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const renderTweetBox = () => {
    return (
      <article
        onClick={() => {
          !isThreadHead && navigate(`/thread/${id}`);
        }}
        className={`w-11/12 md:w-9/12 p-2 flex flex-col gap-6 ${
          !isThreadHead && 'cursor-pointer'
        }  border-b-2 border-gray-ExtraLight  bg-gray-ExtraExtraLight hover:bg-gray-ExtraLight ${
          !isThreadHead && 'opacity-70'
        }`}
      >
        <section dir="ltr" className="flex flex-col gap-2">
          <div className="flex w-fit justify-center items-center text-xl">
            <span className="text-3xl mr-2">
              <BiUserCircle />
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user/${user.username}/tweets`);
              }}
            >
              <span className="text-blue hover:underline">
                @{user.username}
              </span>
            </button>
          </div>
          <p className="text-lg break-words" dir="rtl">
            {body}
          </p>
        </section>
        <section className="flex justify-start gap-6 px-4 text-xl">
          <button
            className="hover:text-[#333]"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(tweetActions.ToggleModal(id));
            }}
          >
            <BsFillReplyFill />
          </button>

          {/* because of issue in back-end there is no proper way to handel like/unlike actions */}
          <button
            className={`flex items-center justify-between gap-2 hover:text-[#333] transition-colors duration-150 ${
              favorites.includes(state.auth.userId) && 'text-blue'
            } `}
            onClick={(e) => {
              e.stopPropagation();
              if (!favorites.includes(state.auth.userId)) {
                dispatch(
                  feedActions.likeTweet({
                    tweetId: id,
                    currentLoggedInUserId: state.auth.userId,
                  })
                );
              }
            }}
          >
            <span>
              <AiTwotoneLike />
            </span>
            <span>{favcount}</span>
          </button>

          {user.name === state.auth.username && (
            <button
              className="hover:text-[#333]"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(feedActions.deleteTweet(id));
              }}
            >
              <TiDelete />
            </button>
          )}
        </section>
      </article>
    );
  };
  return renderTweetBox();
};

export default TweetBox;
