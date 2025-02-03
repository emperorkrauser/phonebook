import { Routes, Route } from 'react-router';
import { LoginPage, RegistrationPage } from './public';
import { DashboardPage, YourContactsPage } from './private';
import { ProtectedRoutes } from './protected-routes';

const PrivatePages = ({
  isAuth,
  isAdmin,
}: {
  isAuth: boolean;
  isAdmin: boolean;
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
          <Route path='/admin-dashboard' element={<DashboardPage />} />
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
  const isAuth = true;
  const isToRegister = false;
  const isAdmin = false;

  if (isAuth) {
    return <PrivatePages isAuth={isAuth} isAdmin={isAdmin} />;
  }

  return <PublicPages isAuth={isAuth} isToRegister={isToRegister} />;
};
