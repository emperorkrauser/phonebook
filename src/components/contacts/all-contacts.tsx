import { useState, useEffect } from 'react';
import { useUser } from '../../hooks';
import { ContactsLayout } from './contacts-layout';
import { UserDetails, UserItem } from '../users';

export const AllContacts = () => {
  const [contacts, setContacts] = useState<UserDetails[]>([]);
  const { browseAll, updateOne } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    const result = await browseAll({ deletedAt: null });
    if (!result) {
      setIsLoading(false);
      return;
    }
    setContacts(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  const handleShare = async (id: string, contacts: string[]) => {
    const res = await updateOne(id, { contacts });
    if (!res) return;
    await fetchUsers();
  };

  return (
    <>
      <ContactsLayout>
        <h4>All Contacts List:</h4>
        {!isLoading ? (
          contacts.length === 0 && <p>&nbsp;No contacts found.</p>
        ) : (
          <p>&nbsp;Loading...</p>
        )}
        <ul className='w-full'>
          {contacts.length > 0 &&
            contacts.map((contact) => {
              return (
                <UserItem
                  key={contact.contactNo}
                  user={contact}
                  isLoading={isLoading}
                  handleShare={handleShare}
                />
              );
            })}
        </ul>
      </ContactsLayout>
    </>
  );
};
