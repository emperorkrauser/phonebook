import { Link } from 'react-router';
export const NavigationBar = () => {
  return (
    <>
      <nav className='container mx-auto  pl-0 ml-0 pb-2 text-black border-b-2 border-gray-100'>
        <ul className='flex gap-4 mx-auto'>
          <li className='ml-0 pl-0'>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/feed'>Feed</Link>
          </li>
          <li>
            <Link to='/contacts'>Contacts</Link>
          </li>
          <li>
            <Link to='/users'>Users</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
