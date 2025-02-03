import { useState, useEffect } from 'react';
import { ContactItem, ContactDetails } from './contacts-item';
import { useContact } from '../../hooks';
import { ContactsLayout } from './contacts-layout';

export const AllContacts = () => {
  const [contacts, setContacts] = useState<ContactDetails[]>([]);
  const { browseAll } = useContact();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchContacts() {
      const result = await browseAll();
      if (!result) {
        console.log('Error fetching contacts');
        return;
        setIsLoading(false);
      }
      const data = result.data;
      setContacts(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    fetchContacts();
  }, []);

  if (isLoading) {
    return <ContactsLayout>Loading...</ContactsLayout>;
  }

  return (
    <>
      <ContactsLayout>
        <h4>All Contacts List:</h4>
        <ul>
          {contacts.length > 0 &&
            contacts.map((contact) => {
              return <ContactItem key={contact.contactNo} contact={contact} />;
            })}
        </ul>
      </ContactsLayout>
    </>
  );
};
