import { useState, useEffect } from 'react';
import { FormButton, FormInput } from '../form';
import { UserLayout } from './user-layout';
import { useLocation, useNavigate } from 'react-router';
import { useUser } from '../../hooks';

export const UserEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateOne } = useUser();
  const { user } = location.state || {};
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    contactNo: user.contactNo,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {}, []);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await updateOne(user._id, formData);
    if (!res) return;
    setIsSubmitting(false);
    navigate('/users');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <UserLayout>
        <form className='px-8 pb-8 mb-4 pt-0 mt-0'>
          <div className='mb-4'>
            <FormInput
              label='First Name'
              placeholder='first name'
              htmlFor='firstName'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              changeInput={handleFormChange}
            />
          </div>
          <div className='mb-4'>
            <FormInput
              label='Last Name'
              placeholder='last name'
              htmlFor='lastName'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              changeInput={handleFormChange}
            />
          </div>
          <div className='mb-4'>
            <FormInput
              label='Email'
              placeholder='email'
              htmlFor='email'
              id='email'
              name='email'
              value={formData.email}
              changeInput={handleFormChange}
            />
          </div>
          <div className='mb-4'>
            <FormInput
              label='Contact Number'
              placeholder='contact number'
              htmlFor='contactNo'
              id='contactNo'
              name='contactNo'
              value={formData.contactNo}
              changeInput={handleFormChange}
            />
          </div>
          <div className='flex items-center justify-between'>
            <FormButton
              label='Submit'
              buttonType='submit'
              clickEvent={handleClick}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </UserLayout>
    </>
  );
};
