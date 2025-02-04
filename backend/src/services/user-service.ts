import { RegisterProps, UserRepository } from '../repositories';

function getRepository() {
  return new UserRepository();
}
export class UserService {
  public static async browse() {
    const result = await getRepository().browse();
    return result;
  }

  public static async browseOne(uuid: string) {
    const result = await getRepository().browseOne(uuid);
    return result;
  }

  public static async browseByEmail(email: string) {
    const result = await getRepository().browseByEmail(email);
    return result;
  }

  public static async add(data: RegisterProps) {
    const result = await getRepository().add(data);
    return result;
  }

  public static async update(uuid: string, data: RegisterProps) {
    const result = await getRepository().update(uuid, data);
    return result;
  }

  public static async delete(uuid: string) {
    const result = await getRepository().delete(uuid);
    return result;
  }
}
