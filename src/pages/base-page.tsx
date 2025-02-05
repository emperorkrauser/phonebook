import { Routes, Route } from 'react-router';
import { LoginPage, RegistrationPage } from './public';
import { DashboardPage, YourContactsPage } from './private';
import { ProtectedRoutes } from './protected-routes';
import { Users } from '../components/users';
import { useSelector } from 'react-redux';

const PrivatePages = ({
  isAuth,
  isAdmin,
  role,
}: {
  isAuth: boolean;
  isAdmin: boolean;
  role: string;
}) => {
  return (
    <Routes>
      <Route path='/' element={!isAuth ? <LoginPage /> : <DashboardPage />} />
      {isAuth && !isAdmin && (
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/feed' element={<DashboardPage />} />
          <Route path='/contacts' element={<YourContactsPage />} />
          <Route path='/*' element={<DashboardPage />} />
        </Route>
      )}
      {isAuth && isAdmin && (
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path='/' element={<DashboardPage />} />
          {role === 'super-admin' && (
            <Route path='/admin-dashboard' element={<DashboardPage />} />
          )}
          <Route path='/contacts' element={<YourContactsPage />} />
          <Route path='/users' element={<Users />} />
          <Route path='/*' element={<DashboardPage />} />
        </Route>
      )}
    </Routes>
  );
};

const PublicPages = ({
  isAuth,
  isToRegister,
}: {
  isAuth: boolean;
  isToRegister: boolean;
}) => {
  return (
    <Routes>
      <Route path='/' element={!isAuth ? <LoginPage /> : <DashboardPage />} />
      <Route
        path='/register'
        element={!isToRegister ? <LoginPage /> : <RegistrationPage />}
      />
      <Route path='/LoginPage' element={<LoginPage />} />
      <Route path='/*' element={<LoginPage />} />
    </Routes>
  );
};

export const BasePage = () => {
  const { isAuth, isToRegister, user } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.auth
  );

  if (isAuth) {
    return (
      <PrivatePages
        isAuth={isAuth}
        isAdmin={user.role !== 'user' ? true : false}
        role={user.role}
      />
    );
  }

  return <PublicPages isAuth={isAuth} isToRegister={isToRegister} />;
};
