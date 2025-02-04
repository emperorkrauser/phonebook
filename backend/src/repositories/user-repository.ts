import moment from 'moment';
import { UserModel } from '../schema';

export interface LoginProps {
  username: string;
  password: string;
}

export interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  contactNo: string;
}

export class UserRepository {
  public async browse() {
    const res = await UserModel.find();
    return res;
  }

  public async browseOne(uuid: string) {
    const res = await UserModel.findOne({ _id: uuid, deletedAt: null });
    if (!res) return;
    return res;
  }

  public async browseByEmail(email: string) {
    const res = await UserModel.findOne({ email, deletedAt: null });
    if (!res) return;
    return res;
  }

  public async add(data: RegisterProps) {
    const finalData = {
      ...data,
      createdAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
      updatedAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
      deletedAt: null,
    };

    const res = await UserModel.create(finalData);
    if (!res) return;
    const savedData = res.save();
    return savedData;
  }

  public async update(uuid: string, data: RegisterProps) {
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
  }

  public async delete(uuid: string) {
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
  }
}
