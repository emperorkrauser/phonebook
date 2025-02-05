import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FormInput, FormButton } from '../../components';
import { useAuth } from '../../hooks';
import { useDispatch } from 'react-redux';
import { storeUser, isLogin } from '../../reducers';
import { useNavigate } from 'react-router';

export const LoginPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {}, []);

  const handleSubmitLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await login(loginData);
    if (!res) return;
    const { data, token, refreshToken } = res;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    dispatch(storeUser(data));
    dispatch(isLogin(true));
    setLoginData({
      email: '',
      password: '',
    });
    navigate('/dashboard');
  };

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className='w-full max-w-xs'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <FormInput
              label='email'
              id='email'
              placeholder='email'
              htmlFor='email'
              type='text'
              name='email'
              changeInput={handleChangeLogin}
            />
          </div>
          <div className='mb-6'>
            <div className='mb-4'>
              <FormInput
                label='password'
                id='password'
                placeholder='password'
                htmlFor='password'
                type='password'
                name='password'
                changeInput={handleChangeLogin}
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <FormButton label='Sign In' clickEvent={handleSubmitLogin} />
            <Link
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
              to='/register'
            >
              Register
            </Link>
          </div>
          <div className='flex items-center justify-between pt-4'>
            <Link
              to='/forgot-password'
              className='inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800'
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
