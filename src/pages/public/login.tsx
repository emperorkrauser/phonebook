import { Link } from 'react-router';
import { FormInput, FormButton } from '../../components';
export const LoginPage = () => {
  return (
    <>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <FormInput
              label="email"
              id="email"
              placeholder="email"
              htmlFor="email"
              type="text"
            />
          </div>
          <div className="mb-6">
            <div className="mb-4">
              <FormInput
                label="password"
                id="password"
                placeholder="password"
                htmlFor="password"
                type="password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <FormButton label="Sign In" buttonType="submit" />
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/register"
            >
              Register
            </Link>
          </div>
          <div className="flex items-center justify-between pt-4">
            <Link
              to="/forgot-password"
              className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
