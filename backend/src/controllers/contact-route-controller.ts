import { ContactProps } from '../repositories';
import { ContactService } from '../services';

export class ContactController {
  public AppService: ContactService;
  constructor() {
    this.AppService = new ContactService();
  }
  public static async browse() {
    const result = await ContactService.browse();
    return result;
  }

  public static async browseOne(uuid: string) {
    const result = await ContactService.browseOne(uuid);
    return result;
  }

  public static async add(data: ContactProps) {
    const result = await ContactService.add(data);
    return result;
  }

  public static async update(uuid: string, data: ContactProps) {
    const result = await ContactService.update(uuid, data);
    return result;
  }

  public static async delete(uuid: string) {
    const result = await ContactService.delete(uuid);
    return result;
  }
}
