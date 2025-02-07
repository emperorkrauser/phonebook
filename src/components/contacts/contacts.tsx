import { useState, useEffect } from 'react';
import { useUser } from '../../hooks';
import { ContactsLayout } from './contacts-layout';
import { UserDetails, UserItem } from '../users';
import { useSelector } from 'react-redux';

export const Contacts = () => {
  const { updateOne, browseAll } = useUser();
  const [contacts, setContacts] = useState<UserDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user: currentUser } = useSelector((state: any) => state.auth);

  const fetchUsers = async () => {
    setIsLoading(true);
    const result = await browseAll({ deletedAt: null });
    if (!result) {
      console.log('Error fetching users');
      setIsLoading(false);
      return;
    }
    const filteredContacts = result.data.filter((contact: UserDetails) => {
      return contact.contacts?.includes(currentUser.contactNo);
    });
    setContacts(filteredContacts);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  const handleShare = async (id: string, contacts: string[]) => {
    console.log('id', id);
    console.log('Share data', contacts);
    const res = await updateOne(id, { contacts });
    if (!res) return;
    await fetchUsers();
  };

  return (
    <>
      <ContactsLayout>
        <h4>My Contacts List:</h4>
        <ul className="w-full">
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
