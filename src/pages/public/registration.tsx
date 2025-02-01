import { FormButton, FormInput } from '../../components';

export const RegistrationPage = () => {
  return (
    <>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <FormInput
              label="First Name"
              placeholder="first name"
              htmlFor="firstName"
              id="firstName"
              name="firstName"
            />
          </div>
          <div className="mb-4">
            <FormInput
              label="Last Name"
              placeholder="last name"
              htmlFor="lastName"
              id="lastName"
              name="lastName"
            />
          </div>
          <div className="mb-4">
            <FormInput
              label="Password"
              placeholder="******************"
              htmlFor="password"
              id="password"
              name="password"
              type="password"
            />
          </div>
          <div className="mb-4">
            <FormInput
              label="Contact Number"
              placeholder="contact number"
              htmlFor="contactNo"
              id="contactNo"
              name="contactNo"
            />
          </div>
          <div className="flex items-center justify-between">
            <FormButton label="Submit" buttonType="submit" />
          </div>
        </form>
      </div>
    </>
  );
};
