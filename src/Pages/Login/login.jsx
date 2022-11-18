import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
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
import { authActions } from '../../store';

const initFormState = {
  username: '',
  password: '',
};

const formSchema = yup.object().shape({
  username: yup
    .string()
    .required('لطفا نام کاربری خود را وارد کنید.')
    .min(5, 'حداقل 5 کاراکتر برای نام کاربری مجاز است.')
    .max(30, 'حداکثر 30 کاراکتر برای نام کاربری مجاز است.'),
  password: yup
    .string()
    .required('لطفا کلمه عبور خود را وارد کنید.')
    .min(5, 'حداقل 5 کاراکتر برای نام کاربری مجاز است.')
    .max(30, 'حداکثر 30 کاراکتر برای کلمه عبور مجاز است.'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  useEffect(() => {
    if (authData.token && authData.userId) {
      navigate(
        searchParams.has('redirect') ? searchParams.get('redirect') : '/home'
      );
    }
  }, [authData]);

  const [searchParams] = useSearchParams();
  const useFormInput = useForm({
    defaultValues: initFormState,
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    dispatch(authActions.login(data));
    dispatch(authActions.getCurrentUserId(data.username))
  };

  const inputsArray = [
    {
      label: 'نام کاربری:',
      name: 'username',
      placeHolder: 'john doe',
      type: 'text',
    },
    {
      label: 'کلمه عبور:',
      name: 'password',
      placeHolder: 'StrongP@ssword1',
      type: 'password',
    },
  ];

  const formHardTexts = {
    submitButton: 'ورود',
    title: 'ورود به کوویتر',
    loginAndSignUpSwitcherText: 'آیا حساب کاربری ندارید؟',
    loginAndSignUpSwitcherPath: `/sign-up${
      searchParams.has('redirect')
        ? '?redirect=' + searchParams.get('redirect')
        : ''
    }`,
  };
  return (
    <UserForm
      inputsArray={inputsArray}
      formHardTexts={formHardTexts}
      useFormInput={useFormInput}
      onSubmit={onSubmit}
    />
  );
};

export default Login;
