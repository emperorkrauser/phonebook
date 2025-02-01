import { Routes, Route } from 'react-router';
import { LoginPage, RegistrationPage } from './public';
import { DashboardPage } from './private';
import { ProtectedRoutes } from './protected-routes';

const PrivatePages = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <Routes>
      <Route path="/" element={!isAuth ? <LoginPage /> : <DashboardPage />} />
      <Route element={<ProtectedRoutes isAuth={isAuth} />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/*" element={<DashboardPage />} />
      </Route>
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
      <Route path="/" element={!isAuth ? <LoginPage /> : <DashboardPage />} />
      <Route
        path="/register"
        element={!isToRegister ? <LoginPage /> : <RegistrationPage />}
      />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/*" element={<LoginPage />} />
    </Routes>
  );
};

export const BasePage = () => {
  const isAuth = false;
  const isToRegister = true;

  if (isAuth) {
    return <PrivatePages isAuth={isAuth} />;
  }

  return <PublicPages isAuth={isAuth} isToRegister={isToRegister} />;
};
