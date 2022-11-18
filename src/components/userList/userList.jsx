import LoadingAnimation from '../loadingAnimation/loadingAnimation';
import UserItem from './userItem';

const UserList = ({ userSArray, title }) => {
  return (
    <ul className=" my-2 relative">
      <div className="w-full flex items-center flex-col gap-2">
        <h1 className="font-bold text-3xl  text-right w-11/12 md:w-9/12 mb-2">
          {title}
        </h1>
        {userSArray.map((user) => {
          return <UserItem key={user.username} {...user} />;
        })}
      </div>
    </ul>
  );
};

export default UserList;
