import { UserProps } from '../repositories';
import { UserService } from '../services';

export class UserController {
  public AppService: UserService;
  constructor() {
    this.AppService = new UserService();
  }
  public static async browse() {
    try {
      const result = await UserService.browse();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async browseOne(uuid: string) {
    try {
      const result = await UserService.browseOne(uuid);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async add(data: UserProps) {
    try {
      const result = await UserService.add(data);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async update(uuid: string, data: UserProps) {
    try {
      const result = await UserService.update(uuid, data);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(uuid: string) {
    try {
      const result = await UserService.delete(uuid);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
