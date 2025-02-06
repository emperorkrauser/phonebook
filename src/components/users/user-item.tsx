import { ContactItemButton } from '../contacts/contact-item-button';
import { Skeleton } from '../contacts/contact-skeleton';
import { BaseProps } from '../contacts';
import { useNavigate } from 'react-router';

export interface UserDetails extends BaseProps {
  firstName?: string;
  lastName?: string;
  email: string;
  contactNo?: string;
  contacts?: string[];
  isShared?: boolean;
  photoUrl?: string;
  status?: string;
  _id: string;
}

interface UserDetailsProps {
  user: UserDetails;
  isLoading?: boolean;
  handleActivate: ({ _id, status }: { _id: string; status: string }) => void;
  handleDelete: (uuid: string) => void;
}

export const UserItem = ({
  user,
  isLoading,
  handleActivate,
  handleDelete,
}: UserDetailsProps) => {
  const navigate = useNavigate();

  const handleUnshare = () => {
    console.log('Unshare');
  };

  if (isLoading) {
    return (
      <li className='border-1 border-gray-200 m-1 ml-0 p-1 w-full'>
        <Skeleton />
      </li>
    );
  }

  const handleActivateUser = async () => {
    await handleActivate({ _id: user._id, status: user.status ?? 'inactive' });
  };

  const handleDeleteUser = async () => {
    handleDelete(user._id);
  };

  const handleEditUser = () => {
    navigate(`/users/${user._id}`, { state: { user } });
  };

  return (
    <>
      <li
        className={`border-1 border-gray-200 m-1 ml-0 p-1
}`}
      >
        <div className='flex'>
          <img
            className='p-4'
            src={user.photoUrl ?? 'https://imageplaceholder.net/100x100'}
            alt={user.firstName}
          />
          <div>
            <ul className='flex text-left p-4 pb-0 gap-2'>
              <li className='m-0 p-0'>
                Name: {user.firstName} {user.lastName}
              </li>
              <li className='m-0 p-0'>Email: {user.email}</li>
              <li className='m-0 p-0'>Contact: {user.contactNo}</li>
            </ul>
            <div className='pl-4 mt-2'>
              {user.isShared ? (
                <ContactItemButton
                  bgColor='bg-red-500'
                  text='Unshare your contact info'
                  clickEvent={handleUnshare}
                />
              ) : (
                <ContactItemButton
                  bgColor='bg-emerald-500'
                  text='Share your contact info'
                  clickEvent={handleUnshare}
                />
              )}
              <ContactItemButton
                bgColor={
                  user.status === 'active' ? 'bg-red-500' : 'bg-emerald-500'
                }
                text={user.status === 'active' ? 'Deactivate' : 'Activate'}
                clickEvent={handleActivateUser}
              />
              <ContactItemButton
                bgColor={'bg-red-500'}
                text='Delete'
                clickEvent={handleDeleteUser}
              />
              <ContactItemButton
                bgColor={'bg-amber-500'}
                text='Edit'
                clickEvent={handleEditUser}
              />
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
