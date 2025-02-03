import { UserProps, UserRepository } from '../repositories';

function getRepository() {
  return new UserRepository();
}
export class UserService {
  public static async browse() {
    try {
      const result = await getRepository().browse();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async browseOne(uuid: string) {
    try {
      const result = await getRepository().browseOne(uuid);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async add(data: UserProps) {
    try {
      const result = await getRepository().add(data);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async update(uuid: string, data: UserProps) {
    try {
      const result = await getRepository().update(uuid, data);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(uuid: string) {
    try {
      const result = await getRepository().delete(uuid);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
