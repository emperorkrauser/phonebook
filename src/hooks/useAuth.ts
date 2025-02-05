import { AuthService, LoginProps, RegisterProps } from '../services';

export function useAuth() {
  const authService = new AuthService();

  async function register(payload: RegisterProps) {
    const result = await authService.register(payload);
    return result;
  }

  async function login(payload: LoginProps) {
    const result = await authService.login(payload);
    return result;
  }

  async function logout() {
    const result = await authService.logout();
    return result;
  }

  return {
    register,
    login,
    logout,
  };
}
