import { ContactItemButton } from '../contacts/contact-item-button';
import { Skeleton } from '../contacts/contact-skeleton';
import { BaseProps } from '../contacts';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

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
  handleActivate?: ({ _id, status }: { _id: string; status: string }) => void;
  handleDelete?: (uuid: string) => void;
  handleShare?: (id: string, contacts: string[]) => void;
}

export const UserItem = ({
  user,
  isLoading,
  handleActivate,
  handleDelete,
  handleShare,
}: UserDetailsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user: currentUser } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    setIsShared(user.contacts?.includes(currentUser.contactNo) ?? false);
  }, [user]);

  const handleShareContact = () => {
    if (handleShare) {
      handleShare(user._id, [...(user.contacts || []), currentUser.contactNo]);
    }
  };

  const handleUnshareContact = () => {
    if (handleShare) {
      handleShare(
        user._id,
        (user.contacts || []).filter(
          (contact) => contact !== currentUser.contactNo
        )
      );
    }
  };

  if (isLoading) {
    return (
      <li
        key={user._id}
        className="border-1 border-gray-200 m-1 ml-0 p-1 w-full"
      >
        <Skeleton />
      </li>
    );
  }

  const handleActivateUser = async () => {
    if (!handleActivate) return;
    await handleActivate({ _id: user._id, status: user.status ?? 'inactive' });
  };

  const handleDeleteUser = async () => {
    if (!handleDelete) return;
    handleDelete(user._id);
  };

  const handleEditUser = () => {
    navigate(`/users/${user._id}`, { state: { user } });
  };

  return (
    <li
      key={user._id}
      className={`border-1 border-gray-200 m-1 ml-0 p-1
}`}
    >
      <div className="flex">
        <img
          className="p-4"
          src={user.photoUrl ?? 'https://imageplaceholder.net/100x100'}
          alt={user.firstName}
        />
        <div>
          <ul className="flex text-left p-4 pb-0 gap-2">
            <li className="m-0 p-0">
              Name: {user.firstName} {user.lastName}
            </li>
            <li className="m-0 p-0">Email: {user.email}</li>
            <li className="m-0 p-0">Contact: {user.contactNo}</li>
          </ul>
          <div className="pl-4 mt-2">
            {isShared ? (
              <ContactItemButton
                bgColor="bg-red-500"
                text="Unshare your contact info"
                clickEvent={handleUnshareContact}
              />
            ) : (
              <ContactItemButton
                bgColor="bg-emerald-500"
                text="Share your contact info"
                clickEvent={handleShareContact}
              />
            )}
            {currentUser.role === 'admin' ||
              (currentUser.role === 'super-admin' && (
                <>
                  <ContactItemButton
                    bgColor={
                      user.status === 'active' ? 'bg-red-500' : 'bg-emerald-500'
                    }
                    text={user.status === 'active' ? 'Deactivate' : 'Activate'}
                    clickEvent={handleActivateUser}
                  />
                  <ContactItemButton
                    bgColor={'bg-red-500'}
                    text="Delete"
                    clickEvent={handleDeleteUser}
                  />
                  <ContactItemButton
                    bgColor={'bg-amber-500'}
                    text="Edit"
                    clickEvent={handleEditUser}
                  />
                </>
              ))}
          </div>
        </div>
      </div>
    </li>
  );
};
