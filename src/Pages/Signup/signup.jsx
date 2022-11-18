import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import UserForm from '../../components/userForm/userForm';
import * as yup from 'yup';
import { httpRequest } from '../../services/httpRequest';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';


const initFormState = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { passwordConfirm, ...requestBody } = data;
    toast.dismiss('signUp');
    toast.loading('صبر کنید...', {
      toastId: 'signUp',
    });
    httpRequest
      .signUp(requestBody)
      .then((res) => {
        toast.update('signUp', {
          render: `حساب کاربری شما با موفقیت ایجاد شد`,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        dispatch(authActions.logout());
        navigate(
          `/login${
            searchParams.has('redirect')
              ? '?redirect=' + searchParams.get('redirect')
              : ''
          }`
        );
      })
      .catch((error) => {
        toast.update('signUp', {
          render: 'این نام کاربری یا ایمیل از قبل وجود دارد.',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      });
  };

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required('لطفا نام کاربری خود را وارد کنید.')
      .min(5, 'حداقل 5 کاراکتر برای نام کاربری مجاز است.')
      .max(30, 'حداکثر 30 کاراکتر برای نام کاربری مجاز است.'),
    email: yup
      .string()
      .email('ایمیل وارد شده معتبر نیست!')
      .max(255)
      .required('وارد کردن ایمیل الزامی است'),
    password: yup
      .string()
      .required('لطفا کلمه عبور خود را وارد کنید.')
      .min(5, 'حداقل 5 کاراکتر برای نام کاربری مجاز است.')
      .max(30, 'حداکثر 30 کاراکتر برای کلمه عبور مجاز است.'),
    passwordConfirm: yup
      .string()
      .required('تایید کلمه عبور الزامی است.')
      .oneOf(
        [yup.ref('password'), null],
        'تایید کلمه عبور با کلمه عبور هماهنگ نیست'
      ),
  });

  const [searchParams] = useSearchParams();
  const useFormInput = useForm({
    defaultValues: initFormState,
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });

  const inputsArray = [
    {
      label: 'نام کاربری:',
      name: 'username',
      placeHolder: 'john doe',
      type: 'text',
    },
    {
      label: 'ایمیل:',
      name: 'email',
      placeHolder: 'example@example.com',
      type: 'email',
    },
    {
      label: 'کلمه عبور:',
      name: 'password',
      placeHolder: 'StrongP@ssword1',
      type: 'password',
    },
    {
      label: 'تایید کلمه عبور:',
      name: 'passwordConfirm',
      placeHolder: 'StrongP@ssword1',
      type: 'password',
    },
  ];

  const formHardTexts = {
    submitButton: 'ساخت حساب',
    title: 'ساخت حساب کوویتر',
    loginAndSignUpSwitcherText: 'حساب کاربری دارید؟',
    loginAndSignUpSwitcherPath: `/login${
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

export default SignUp;
