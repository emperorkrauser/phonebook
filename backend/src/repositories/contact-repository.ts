import moment from 'moment';
import { ContactModel } from '../schema';
import { contacts } from '../repositories';

export interface BaseProps {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ContactProps extends BaseProps {
  firstName?: string;
  lastName?: string;
  email: string;
  contactNo?: string;
  contacts?: string[];
  isShared?: boolean;
  photoUrl?: string;
}

export class ContactRepository {
  public async browse() {
    try {
      // const res = await ContactModel.find({ deletedAt: null });
      return contacts;
    } catch (error) {
      console.error(error);
    }
  }

  public async browseOne(uuid: string) {
    try {
      const res = await ContactModel.findOne({ _id: uuid, deletedAt: null });
      if (!res) return;
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  public async add(data: ContactProps) {
    const finalData = {
      ...data,
      createdAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
      updatedAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
      deletedAt: null,
    };

    try {
      const res = await ContactModel.create(finalData);
      if (!res) return;
      const savedData = res.save();
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  public async update(uuid: string, data: ContactProps) {
    try {
      const found = await this.browseOne(uuid);
      if (!found) return;
      const res = await ContactModel.findOneAndUpdate(
        { _id: uuid },
        {
          ...data,
          updatedAt: moment().format('MM-DD-YYYY-hh:mm'),
        },
        {
          new: true,
        }
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  public async delete(uuid: string) {
    try {
      const found = await this.browseOne(uuid);
      if (!found) return;
      const res = await ContactModel.findOneAndUpdate(
        { _id: uuid },
        {
          deletedAt: moment().format('MM-DD-YYYY-hh:mm'),
        },
        {
          new: true,
        }
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
