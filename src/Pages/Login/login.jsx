import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import UserForm from '../../components/userForm/userForm';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
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
  const state = useSelector((state) => state);
  useEffect(() => {
    if (state.auth.token && state.loggedInUserProfile.id) {
      navigate(
        searchParams.has('redirect') ? searchParams.get('redirect') : '/home'
      );
    }
  }, [state.auth, state.loggedInUserProfile]);

  const [searchParams] = useSearchParams();
  const useFormInput = useForm({
    defaultValues: initFormState,
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    dispatch(authActions.login(data));
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
