import { UserProps, UserService } from '../services';

export function useUser() {
  const userService = new UserService();

  async function browseAll(payload: UserProps) {
    const result = await userService.browseAll(payload);
    return result;
  }

  async function updateOne(uuid: string, payload: UserProps) {
    const result = await userService.updateOne(uuid, payload);
    return result;
  }

  async function deleteOne(uuid: string) {
    const result = await userService.deleteOne(uuid);
    return result;
  }

  return {
    browseAll,
    updateOne,
    deleteOne,
  };
}
