import { ContactItemButton } from './contact-item-button';
import { Skeleton } from './contact-skeleton';

export interface BaseProps {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ContactDetails extends BaseProps {
  firstName?: string;
  lastName?: string;
  email: string;
  contactNo?: string;
  contacts?: string[];
  isShared?: boolean;
  photoUrl?: string;
}

interface ContactItemProps {
  contact: ContactDetails;
  isLoading?: boolean;
}

export const ContactItem = ({ contact, isLoading }: ContactItemProps) => {
  const handleUnshare = () => {};

  if (isLoading) {
    return (
      <li className="border-1 border-gray-200 m-1 ml-0 p-1 w-full">
        <Skeleton />
      </li>
    );
  }

  return (
    <>
      <li
        className={`border-1 border-gray-200 m-1 ml-0 p-1
}`}
      >
        <div className="flex">
          <img
            className="p-4"
            src={contact.photoUrl ?? 'https://imageplaceholder.net/100x100'}
            alt={contact.firstName}
          />
          <div>
            <ul className="flex text-left p-4 pb-0 gap-2">
              <li className="m-0 p-0">
                Name: {contact.firstName} {contact.lastName}
              </li>
              <li className="m-0 p-0">Email: {contact.email}</li>
              <li className="m-0 p-0">Contact: {contact.contactNo}</li>
            </ul>
            <div className="pl-4 mt-2">
              {contact.isShared ? (
                <ContactItemButton
                  bgColor="bg-red-500"
                  text="Unshare your contact info"
                  clickEvent={handleUnshare}
                />
              ) : (
                <ContactItemButton
                  bgColor="bg-emerald-500"
                  text="Share your contact info"
                  clickEvent={handleUnshare}
                />
              )}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
