import { useState, useEffect } from 'react';
import { ContactItem, ContactDetails } from './contacts-item';
import { useContact } from '../../hooks';
import { ContactsLayout } from './contacts-layout';

export const Contacts = () => {
  const [contacts, setContacts] = useState<ContactDetails[]>([]);
  const { browseAll } = useContact();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchContacts() {
      const result = await browseAll();
      if (!result) {
        console.log('Error fetching contacts');
        setIsLoading(false);
        return;
      }
      const data = result.data;
      setContacts(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    fetchContacts();
  }, []);

  return (
    <>
      <ContactsLayout>
        <h4>My Contacts List:</h4>
        <ul className='w-full'>
          {contacts.length > 0 &&
            contacts.map((contact) => {
              return (
                <ContactItem
                  key={contact.contactNo}
                  contact={contact}
                  isLoading={isLoading}
                />
              );
            })}
        </ul>
      </ContactsLayout>
    </>
  );
};
