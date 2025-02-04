import { AuthService, RegisterProps } from '../services';

export function useAuth() {
  const authService = new AuthService();

  async function register(payload: RegisterProps) {
    const result = await authService.register(payload);
    return result;
  }

  return {
    register,
  };
}
