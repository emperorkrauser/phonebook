import { ContactService } from '../services';

export function useContact() {
  const userService = new ContactService();

  async function browseAll() {
    const result = await userService.browseAll();
    return result;
  }

  return {
    browseAll,
  };
}
