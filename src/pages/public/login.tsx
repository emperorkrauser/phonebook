import { useState } from 'react';
import { Link } from 'react-router';
import { FormInput, FormButton } from '../../components';
import { useAuth } from '../../hooks';
import { useDispatch } from 'react-redux';
import { storeUser, isLogin, isToRegister } from '../../reducers';
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
  const [error, setError] = useState('');

  const handleSubmitLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('loginData', loginData);
    if (
      loginData.email === '' ||
      loginData.password === '' ||
      loginData.password.length < 6
    ) {
      setError('Please fill in all fields');
      return;
    }
    const res = await login(loginData);
    if (!res) return;

    const { data, token, refreshToken } = res;
    if (data.status !== 'active') {
      setError('User is not yet approved. Please wait.');
      dispatch(storeUser({}));
      dispatch(isLogin(false));
      dispatch(isToRegister(false));
      setLoginData({
        email: '',
        password: '',
      });
      navigate('/');
      return;
    }
    setError('');
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

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(isToRegister(true));
    navigate('/register');
  };

  return (
    <>
      <div className='w-full max-w-xs'>
        <h1 className='text-4xl'>Phonebook</h1>
        {error && <p className='text-red-500'>{error}</p>}
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <FormInput
              label='email'
              id='email'
              placeholder='email'
              htmlFor='email'
              type='text'
              name='email'
              value={loginData.email}
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
                value={loginData.password}
                changeInput={handleChangeLogin}
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <FormButton label='Sign In' clickEvent={handleSubmitLogin} />
            <FormButton label='Register' clickEvent={handleRegister} />
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
