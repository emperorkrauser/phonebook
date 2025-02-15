import moment from 'moment';
import { UserModel } from '../schema';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

export interface LoginProps {
  username: string;
  password: string;
}

export interface UpdateUserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  status?: string;
  contactNo?: string;
  contacts?: string[];
}

export interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  contactNo: string;
  contacts?: string[];
}

dotenv.config();
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@phonebook.5hk3r.mongodb.net/?retryWrites=true&w=majority&appName=phonebook`;
const client = new MongoClient(uri);

export class UserRepository {
  private dbName = 'phonebook';
  private collectionName = 'users';

  private async connect() {
    const database = client.db(this.dbName);
    const collection = database.collection(this.collectionName);
    return collection;
  }

  public async browse(data: UpdateUserProps) {
    const collection = await this.connect();
    const res = await collection.find({ ...data, deletedAt: null }).toArray();
    return res;
  }

  public async browseOne(uuid: string) {
    const collection = await this.connect();
    const res = await collection.findOne({
      _id: new ObjectId(uuid),
      deletedAt: null,
    });
    if (!res) return;
    return res;
  }

  public async browseByEmail(email: string) {
    const collection = await this.connect();
    const res = await collection.findOne({ email, deletedAt: null });
    if (!res) return;
    return res;
  }

  public async add(data: RegisterProps) {
    const finalData = {
      ...data,
      contacts: [],
      createdAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
      updatedAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
      deletedAt: null,
    };

    const collection = await this.connect();
    const result = await collection.insertOne(finalData);
    const insertedObject = await collection.findOne({ _id: result.insertedId });
    return {
      ...insertedObject,
      password: null,
    };
  }

  public async update(uuid: string, data: UpdateUserProps) {
    const collection = await this.connect();
    const found = await this.browseOne(uuid);
    const updatedAt = moment().format('MM-DD-YYYY-hh:mm:ss');
    if (!found) return;
    const updatedData = await collection.updateOne(
      {
        _id: new ObjectId(uuid),
      },
      {
        $set: {
          ...found,
          ...data,
          updatedAt,
        },
      }
    );
    return {
      ...data,
      _id: uuid,
      updatedAt,
    };
  }

  public async delete(uuid: string) {
    const collection = await this.connect();
    const found = await this.browseOne(uuid);
    if (!found) return;
    const res = await collection.updateOne(
      {
        _id: new ObjectId(uuid),
      },
      {
        $set: {
          ...found,
          status: 'inactive',
          updatedAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
          deletedAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
        },
      }
    );
    return {
      res,
      ...found,
      deletedAt: moment().format('MM-DD-YYYY-hh:mm:ss'),
    };
  }
}
