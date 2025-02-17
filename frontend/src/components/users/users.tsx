import { UserItem } from './user-item';
import { UserLayout } from './user-layout';
import { useUser } from '../../hooks';
import { BaseProps } from '../contacts';
import { useQuery, useMutation } from '@tanstack/react-query';

interface User extends BaseProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  contactNo: string;
  contacts?: string[];
}

export const Users = () => {
  const { updateOne, browseAll, deleteOne } = useUser();

  const { data, isPending, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => browseAll({ deletedAt: null }),
  });

  const { mutate: updateUserMutation, isPending: isMutating } = useMutation({
    mutationFn: async ({ _id, status }: { _id: string; status: string }) => {
      return updateOne(_id, {
        status: status === 'active' ? 'inactive' : 'active',
      });
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: async (uuid: string) => {
      return deleteOne(uuid);
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const { mutate: shareContactMutation } = useMutation({
    mutationFn: async ({
      _id,
      contacts,
    }: {
      _id: string;
      contacts: string[];
    }) => {
      return updateOne(_id, { contacts });
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <>
      <UserLayout>
        <h4>All Users List:</h4>
        {!isPending || !isMutating ? (
          data?.data?.length === 0 && <p>&nbsp;No contacts found.</p>
        ) : (
          <p>&nbsp;Loading...</p>
        )}
        <ul className='w-full'>
          {data?.data?.length > 0 ? (
            data?.data?.map((user: User) => {
              return (
                <UserItem
                  key={user.contactNo}
                  user={user}
                  isLoading={isPending}
                  handleActivate={updateUserMutation}
                  handleDelete={deleteUserMutation}
                  handleShare={shareContactMutation}
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
