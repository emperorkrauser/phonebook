import { ReactNode } from 'react';
import { YourInfo } from '../contacts';

export const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='flex flex-row gap-2 pt-6'>
        <section className='text-left pr-10'>
          <YourInfo />
        </section>
        <section className='text-left flex flex-row flex-wrap relative w-[100vw]'>
          {children}
        </section>
      </div>
    </>
  );
};
