import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingAnimation from '../../components/loadingAnimation/loadingAnimation';
import UserList from '../../components/userList/userList';
import Default from '../../Layout/Default';
import { httpRequest } from '../../services/httpRequest';
import { profileActions } from '../../store';

const initialSearchResult = {
  isLoading: false,
  payload: {
    username: '',
    followersCount: NaN,
    errorMessage: 'کاربر مورد نظر خود را جستجو کنید.',
  },
};

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState({
    ...initialSearchResult,
    payload: { ...initialSearchResult.payload },
  });

  useEffect(() => {
    if (searchInput.trim()) {
      setSearchResult({
        isLoading: true,
        payload: { ...initialSearchResult.payload },
      });
      httpRequest
        .getUser(searchInput)
        .then((res) => {
          const { username, followers } = res.data;
          const newResult = {
            ...initialSearchResult,
            payload: { ...initialSearchResult.payload },
          };
          newResult.isLoading = false;
          newResult.payload.username = username;
          newResult.payload.followersCount = followers.length;
          newResult.payload.errorMessage = '';
          setSearchResult(newResult);
        })
        .catch((error) => {
          const newResult = {
            ...initialSearchResult,
            payload: { ...initialSearchResult.payload },
          };

          newResult.payload.errorMessage =
            error?.response?.status === 404
              ? 'کاربر مورد نظر یافت نشد.'
              : 'اتصال اینترنت خود را برسی کنید.';

          setSearchResult(newResult);
        });
    }
  }, [searchInput]);

  return (
    <Default pageName="جستجو">
      <div className="flex flex-col gap-4 p-4 justify-center">
        <div className="flex flex-col gap-3 items-center border-b-4 border-b-gray-light rounded p-4">
          <label
            className="text-right w-9/12 md:w-7/12 font-bold text-xl"
            htmlFor="searchInput"
          >
            جستجو نام کاربری:{' '}
          </label>
          <input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            id="searchInput"
            className="w-9/12 md:w-7/12  rounded-md   border-gray-dark focus:border-blue outline-none border-2 mt-2 py-2 px-3"
            type="text"
          />
        </div>
        {searchResult.payload.errorMessage ? (
          <span className="p-2 bg-blue mx-auto text-white font-medium rounded-xl">
            {searchResult.payload.errorMessage}
          </span>
        ) : (
          <UserList
            userSArray={[{ ...searchResult.payload }]}
            title="کاربران یافت شده:"
          />
        )}
      </div>
    </Default>
  );
};

export default Search;
