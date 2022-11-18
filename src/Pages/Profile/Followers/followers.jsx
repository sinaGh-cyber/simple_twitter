import { useSelector } from "react-redux";
import UserList from "../../../components/userList/userList";

const Followers = () => {
    const profile = useSelector(state=>state.profile)
  return <>
  <UserList userSArray={profile.followers} title='دنبال کننده ها:'/>
  </>;
};

export default Followers;
