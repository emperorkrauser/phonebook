import { useState } from 'react';
import { FormButton, FormInput } from '../../components';
import { useAuth } from '../../hooks';

export const RegistrationPage = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    contactNo: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isValid = handleValidateForm();
    if (!isValid) return;
    register(formData);
  };

  const handleValidateForm = () => {
    const { firstName, lastName, password, email, contactNo } = formData;
    if (
      firstName === '' ||
      lastName === '' ||
      password === '' ||
      email === '' ||
      contactNo === ''
    ) {
      setIsFormValid(false);
      return false;
    }
    setIsFormValid(true);
    return true;
  };

  return (
    <>
      <div className='w-full max-w-xs'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <FormInput
              label='First Name'
              placeholder='first name'
              htmlFor='firstName'
              id='firstName'
              name='firstName'
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
              changeInput={handleFormChange}
            />
          </div>
          <div className='mb-4'>
            <FormInput
              label='Password'
              placeholder='******************'
              htmlFor='password'
              id='password'
              name='password'
              type='password'
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
              changeInput={handleFormChange}
            />
          </div>
          <div className='flex items-center justify-between'>
            <FormButton
              label='Submit'
              buttonType='submit'
              clickEvent={handleClick}
            />
          </div>
          {isSubmitting && !isFormValid && (
            <p className='text-red-600'>Please populate all fields.</p>
          )}
        </form>
      </div>
    </>
  );
};
