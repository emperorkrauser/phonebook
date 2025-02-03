import { ReactNode } from 'react';
import { NavigationBar } from '../../components/header';
export const DashboarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};
