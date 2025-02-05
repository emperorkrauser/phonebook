import { RegisterProps, UpdateUserProps } from '../repositories';
import { UserService } from '../services';

export class UserController {
  public AppService: UserService;
  constructor() {
    this.AppService = new UserService();
  }
  public static async browse() {
    const result = await UserService.browse();
    return result;
  }

  public static async browseOne(uuid: string) {
    const result = await UserService.browseOne(uuid);
    return result;
  }

  public static async browseByEmail(email: string) {
    const result = await UserService.browseByEmail(email);
    return result;
  }

  public static async add(data: RegisterProps) {
    const result = await UserService.add(data);
    return result;
  }

  public static async update(uuid: string, data: UpdateUserProps) {
    const result = await UserService.update(uuid, data);
    return result;
  }

  public static async delete(uuid: string) {
    const result = await UserService.delete(uuid);
    return result;
  }
}
