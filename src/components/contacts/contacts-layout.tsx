import { ReactNode } from 'react';
import { YourInfo } from './your-info';

export const ContactsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='flex flex-row gap-2 pt-6'>
        <section className='text-left pr-10'>
          <YourInfo />
        </section>
        <section className='text-left'>{children}</section>
      </div>
    </>
  );
};
