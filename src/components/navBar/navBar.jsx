import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaUser, FaSearch } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';

import { authActions, tweetActions } from '../../store';
import MainNavBarLink from './mainNavBarLink';

const navBtnTextStyle = 'hidden lg:inline md:w-4/6 text-left';
const navBtnIconStyle = 'text-4xl lg:w-2/6';
const navBtnInnerDiv =
  'flex justify-around px-6 py-2 text-2xl hover:text-black hover:bg-gray-ExtraLight rounded-md';

const NavBar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  const onLogoutBtnHandler = () => {
    dispatch(authActions.logout());
  };
  const tweetModalToggleBtnHandler = () => {
    dispatch(tweetActions.ToggleModal());
  };

  return (
    <nav className="w-full  md:h-screen p-1 flex flex-row-reverse md:flex-col justify-between items-center overflow-x-hidden">
      <ul className="w-full flex flex-row-reverse justify-around md:justify-start md:flex-col">
        <NavLink className="mb-4 hidden md:block" to="/home">
          <h1 className="font-bold text-2xl  p-2  border-b-2 border-b-gray-light text-center">
            کوویتر
          </h1>
        </NavLink>

        <MainNavBarLink to="/home" showText={'خانه'} Icon={AiFillHome} />

        <MainNavBarLink
          to={`/user/${username}/tweets`}
          showText={'پروفایل'}
          Icon={FaUser }
        />

        <MainNavBarLink to={`/search`} showText={'جستجو'} Icon={FaSearch} />

        <button onClick={tweetModalToggleBtnHandler}>
          <div className={`${navBtnInnerDiv} items-center gap-4`}>
            {' '}
            <span className={navBtnIconStyle}>
              <BiMessageRoundedAdd />
            </span>{' '}
            <span className={navBtnTextStyle}>توییت</span>
          </div>
        </button>
      </ul>
      <ul className="md:w-full w-5/12 flex  justify-start">
        <button onClick={onLogoutBtnHandler} className="md:w-full md:mb-5 ">
          <div className={navBtnInnerDiv}>
            {' '}
            <span className={navBtnIconStyle}>{<IoLogOut />}</span>{' '}
            <span className={navBtnTextStyle}>{username}</span>
          </div>
        </button>
      </ul>
    </nav>
  );
};

export default NavBar;
