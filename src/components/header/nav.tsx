import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { storeUser, isLogin, isToRegister } from '../../reducers';

export const NavigationBar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(storeUser({}));
    dispatch(isLogin(false));
    dispatch(isToRegister(false));
    await logout();
    localStorage.clear();
    navigate('/');
    navigate(0);
  };
  return (
    <>
      <nav className='container mx-auto  pl-0 ml-0 pb-2 text-black border-b-2 border-gray-100'>
        <ul className='flex gap-4 mx-auto'>
          <li className='ml-0 pl-0'>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/contacts'>Contacts</Link>
          </li>
          {user.role === 'super-admin' && (
            <li>
              <Link to='/users'>User Management</Link>
            </li>
          )}
          <li>
            <button
              className='text-amber-700 cursor-pointer'
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
