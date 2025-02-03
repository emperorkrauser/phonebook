export const YourInfo = () => {
  const { firstName, lastName, email, contactNo } = {
    firstName: 'Christian Adam',
    lastName: 'Rosell',
    email: 'email@example.com',
    contactNo: '1234567890',
  };
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
