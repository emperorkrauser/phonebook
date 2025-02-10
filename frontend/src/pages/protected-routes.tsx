import { Navigate, Outlet } from 'react-router';

export const ProtectedRoutes = ({ isAuth }: { isAuth: boolean }) => {
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
