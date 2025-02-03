import moment from 'moment';
import { UserModel } from '../schema';

export interface UserProps {
  username: string;
  password: string;
  role: string;
  status: string;
}

export class UserRepository {
  public async browse() {
    try {
      const res = await UserModel.find();
      return res;
    } catch (error) {
      throw error;
    }
  }

  public async browseOne(uuid: string) {
    try {
      const res = await UserModel.findOne({ _id: uuid, deletedAt: null });
      if (!res) return;
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  public async add(data: UserProps) {
    const finalData = {
      ...data,
      createdAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
      updatedAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
      deletedAt: null,
    };

    try {
      const res = await UserModel.create(finalData);
      if (!res) return;
      const savedData = res.save();
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  public async update(uuid: string, data: UserProps) {
    try {
      const found = await this.browseOne(uuid);
      if (!found) return;
      const res = await UserModel.findOneAndUpdate(
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
      const res = await UserModel.findOneAndUpdate(
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
