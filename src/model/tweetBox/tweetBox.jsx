import { BsFillReplyFill } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { AiTwotoneLike } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { useTweetBox } from './useTweetBox';

const TweetBox = ({
  body,
  favcount,
  id,
  favorites,
  user,
  isThreadHead,
  reactWindowStyle,
}) => {
   
  const renderTweetBox = () => {
    
    const {
      loggedInUserProfile,
      replyBtnHandler,
      goToUserProfileBtnHandler,
      goToThreadHeadHandler,
      likeBtnHandler,
      deleteBtnHandler,
    } = useTweetBox(id, favorites, isThreadHead,user);
    
    return (
      <article
        style={reactWindowStyle}
        onClick={goToThreadHeadHandler}
        className={`w-11/12 md:w-9/12 p-2 flex flex-col gap-6  ${
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
            <button onClick={goToUserProfileBtnHandler}>
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
          <button className="hover:text-[#333]" onClick={replyBtnHandler}>
            <BsFillReplyFill />
          </button>

          {/* because of issue in back-end there is no proper way to handel like/unlike actions */}
          <button
            className={`flex items-center justify-between gap-2 hover:text-[#333] transition-colors duration-150 ${
              favorites.includes(loggedInUserProfile.id) && 'text-blue'
            } `}
            onClick={likeBtnHandler}
          >
            <span>
              <AiTwotoneLike />
            </span>
            <span>{favcount}</span>
          </button>

          {user.name === loggedInUserProfile.username && (
            <button className="hover:text-[#333]" onClick={deleteBtnHandler}>
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
