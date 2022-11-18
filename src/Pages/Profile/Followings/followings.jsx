import { useSelector } from "react-redux";
import UserList from "../../../components/userList/userList";

const Followings = () => {
    const profile = useSelector(state=>state.profile)
  return <>
  <UserList userSArray={profile.followings} title='دنبال شونده ها:'/>
  </>;
}
 
export default Followings;