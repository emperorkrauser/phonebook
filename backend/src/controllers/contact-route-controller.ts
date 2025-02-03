import { ContactProps } from '../repositories';
import { ContactService } from '../services';

export class ContactController {
  public AppService: ContactService;
  constructor() {
    this.AppService = new ContactService();
  }
  public static async browse() {
    try {
      const result = await ContactService.browse();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async browseOne(uuid: string) {
    try {
      const result = await ContactService.browseOne(uuid);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async add(data: ContactProps) {
    try {
      const result = await ContactService.add(data);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async update(uuid: string, data: ContactProps) {
    try {
      const result = await ContactService.update(uuid, data);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(uuid: string) {
    try {
      const result = await ContactService.delete(uuid);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
