import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  json,
  Navigate,
  NavLink,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import UserForm from '../../components/userForm/userForm';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { authActions, tweetActions } from '../../store';
import { BiLogOut } from 'react-icons/bi';

const initFormState = {
  body: '',
  tags: '',
};

const formSchema = yup.object().shape({
  body: yup
    .string()
    .required('متن توییت الزامی است!')
    .max(300, 'حداکثر کاراکتر مجاز در هر توییت 300 می باشد!'),
  tags: yup.string(),
});

const TweetModal = () => {
  const replyId = useSelector((state) => state.tweet.replyId);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: initFormState,
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    const { body } = data;
    // api doesn't work properly when include tags key in request body
    console.log(replyId);
    dispatch(
      tweetActions.postTweet(replyId ? { body, reply: replyId } : { body })
    );
  };

  return (
    <div
      onClick={(e) => {
        dispatch(tweetActions.ToggleModal());
      }}
      className="fixed z-10 overflow-auto inset-0 flex justify-center items-center bg-black bg-opacity-30"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-white opacity-100 z-50 w-full h-screen  sm:w-96 sm:min-h-96 sm:max-h-[600px] rounded-md flex flex-col justify-evenly items-center py-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor={'tags'}>هشتگ ها:</label>
          <input
            dir="ltr"
            className="w-72  rounded-md   border-gray-dark focus:border-blue outline-none border-2 mt-2 py-2 px-3"
            placeholder="#quera, #qweeter"
            type="text"
            id={'tags'}
            {...register('tags')}
          />
          {errors.tags && <p>{errors.tags.message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor={'body'}>{'متن توییت:'}</label>
          <textarea
            dir="rtl"
            className="w-72 h-52  rounded-md resize-none   border-gray-dark focus:border-blue outline-none border-2 mt-2 py-2 px-3"
            placeholder={'در چه حالید...'}
            id={'body'}
            {...register('body')}
          />
          {errors.body && <p>{errors.body.message}</p>}
        </div>

        <button
          className="w-72 h-10 pb-2   rounded-3xl bg-black text-white  hover:bg-gray-dark transition-all duration-150 flex items-center justify-center"
          type="submit"
        >
          ارسال
        </button>
        <button
          className="w-72 h-10 pb-2 -mt-8 md:mt-2 rounded-3xl bg-gray-dark text-white  hover:bg-gray-light transition-all duration-150 flex items-center justify-center"
          onClick={(e) => {
            dispatch(tweetActions.ToggleModal());
          }}
        >
          لغو
        </button>
      </form>
    </div>
  );
};

export default TweetModal;
