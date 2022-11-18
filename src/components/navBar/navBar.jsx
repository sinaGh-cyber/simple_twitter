import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaUser, FaSearch } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, tweetActions } from '../../store';

const NavBar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  return (
    <nav className="w-full  md:h-screen p-1 flex flex-row-reverse md:flex-col justify-between items-center overflow-x-hidden">
      <ul className="w-full flex flex-row-reverse justify-around md:justify-start md:flex-col">
        <NavLink className="mb-4 hidden md:block" to="/home">
          <h1 className="font-bold text-2xl  p-2  border-b-2 border-b-gray-light text-center">
            کوویتر
          </h1>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? 'md:mb-4  bg-gray-light rounded-md text-gray-ExtraExtraLight '
              : 'md:mb-4 text-black '
          }
          to="/home"
        >
          <div className="flex justify-around items-center gap-4 px-6 py-2 text-2xl hover:text-black hover:bg-gray-ExtraLight rounded-md ">
            {' '}
            <span className="text-4xl lg:w-2/6">
              <AiFillHome />
            </span>{' '}
            <span className="hidden lg:inline md:w-4/6 text-left">خانه</span>
          </div>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? 'md:mb-4 bg-gray-light rounded-md text-gray-ExtraExtraLight '
              : 'md:mb-4 text-black '
          }
          to={`/user/${username}/tweets`}
        >
          <div className="flex justify-around items-center gap-4 px-6 py-2 text-2xl hover:text-black hover:bg-gray-ExtraLight rounded-md ">
            {' '}
            <span className="text-4xl lg:w-2/6">
              <FaUser />
            </span>{' '}
            <span className="hidden lg:inline md:w-4/6 text-left">پروفایل</span>
          </div>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? 'md:mb-4 bg-gray-light rounded-md text-gray-ExtraExtraLight '
              : 'md:mb-4 text-black '
          }
          to={`/search`}
        >
          <div className="flex justify-around items-center gap-4 px-6 py-2 text-2xl hover:text-black hover:bg-gray-ExtraLight rounded-md ">
            {' '}
            <span className="text-4xl lg:w-2/6">
              <FaSearch />
            </span>{' '}
            <span className="hidden lg:inline md:w-4/6 text-left">جستجو</span>
          </div>
        </NavLink>

        <button
          onClick={() => {
            dispatch(tweetActions.ToggleModal());
          }}
        >
          <div className="flex justify-around items-center gap-4 px-6 py-2 text-2xl hover:text-black hover:bg-gray-ExtraLight rounded-md ">
            {' '}
            <span className="text-4xl lg:w-2/6">
              <BiMessageRoundedAdd />
            </span>{' '}
            <span className="hidden lg:inline md:w-4/6 text-left">توییت</span>
          </div>
        </button>
      </ul>
      <ul className="md:w-full w-5/12 flex  justify-start">
        <button
          onClick={() => {
            dispatch(authActions.logout());
          }}
          className="md:w-full md:mb-5 "
        >
          <div className="flex justify-around px-6 py-2 text-2xl hover:text-black hover:bg-gray-ExtraLight rounded-md ">
            {' '}
            <span className="text-4xl lg:w-2/6">{<IoLogOut />}</span>{' '}
            <span className="hidden lg:inline md:w-4/6 text-left">
              {username}
            </span>
          </div>
        </button>
      </ul>
    </nav>
  );
};

export default NavBar;
