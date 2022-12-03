import { NavLink } from 'react-router-dom';

const navLinkStyle = (navData) =>
  navData.isActive
    ? 'md:mb-4  bg-gray-light rounded-md text-gray-ExtraExtraLight '
    : 'md:mb-4 text-black ';
const navInnerDivStyle =
  'flex justify-around items-center gap-4 px-6 py-2 text-2xl hover:text-black hover:bg-gray-ExtraLight rounded-md ';
const navTextStyle = 'hidden lg:inline md:w-4/6 text-left';
const navIconStyle = 'text-4xl lg:w-2/6';

const MainNavBarLink = ({ to, showText, Icon }) => {
  return (
    <NavLink className={navLinkStyle} to={to}>
      <div className={navInnerDivStyle}>
        {' '}
        <span className={navIconStyle}>
          <Icon />
        </span>{' '}
        <span className={navTextStyle}>{showText}</span>
      </div>
    </NavLink>
  );
};

export default MainNavBarLink;
