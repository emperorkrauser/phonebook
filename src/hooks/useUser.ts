import { UserService } from '../services';

export function useUser() {
  const userService = new UserService();

  async function browseAll() {
    const result = await userService.browseAll();
    return result;
  }

  return {
    browseAll,
  };
}
