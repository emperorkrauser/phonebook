import { useEffect, useState } from 'react';
import { UserItem } from './user-item';
import { UserLayout } from './user-layout';
import { useUser } from '../../hooks';
import { BaseProps } from '../contacts';

interface User extends BaseProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  contactNo: string;
}

export const Users = () => {
  const { updateOne, browseAll, deleteOne } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    const result = await browseAll({ deletedAt: null });
    if (!result) {
      console.log('Error fetching users');
      setIsLoading(false);
      return;
    }
    setUsers(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  const handleActivate = async (updateData: {
    _id: string;
    status: string;
  }) => {
    const { _id, status } = updateData;
    const res = await updateOne(_id, {
      status: status === 'active' ? 'inactive' : 'active',
    });
    if (!res) return;

    await fetchUsers();
  };

  const handleDelete = async (uuid: string) => {
    const res = await deleteOne(uuid);
    if (!res) return;
    await fetchUsers();
  };

  return (
    <>
      <UserLayout>
        <ul className='w-full'>
          {users.length > 0 ? (
            users.map((user) => {
              return (
                <UserItem
                  key={user.contactNo}
                  user={user}
                  isLoading={isLoading}
                  handleActivate={handleActivate}
                  handleDelete={handleDelete}
                />
              );
            })
          ) : (
            <>No inactive users</>
          )}
        </ul>
      </UserLayout>
    </>
  );
};
