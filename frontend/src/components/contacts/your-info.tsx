import { useSelector } from 'react-redux';

export const YourInfo = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user: currentUser } = useSelector((state: any) => state.auth);

  const { firstName, lastName, email, contactNo } = currentUser;
  return (
    <>
      <h4>Your contact details:</h4>
      <img src='' alt='' />
      <ul>
        <li>
          Name: {firstName} {lastName}
        </li>
        <li>Email: {email}</li>
        <li>Contact: {contactNo}</li>
      </ul>
      <span className='text-amber-300 cursor-pointer'>Edit</span>
    </>
  );
};
