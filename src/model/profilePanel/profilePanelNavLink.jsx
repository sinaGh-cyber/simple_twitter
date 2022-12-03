import { NavLink } from 'react-router-dom';

const NavLinkStyle = ({ isActive }) => {
  return isActive
    ? 'bg-black text-white font-bold text-lg p-2 rounded-md'
    : 'font-bold text-lg p-2 rounded-md';
};
const ProfilePanelNavLink = ({to, count, showText}) => {

  return (
    <NavLink className={NavLinkStyle} to={to}>
      {`${count} ${showText}`}
    </NavLink>
  );
};

export default ProfilePanelNavLink;
