import mongoose, { mongo } from 'mongoose';
import { BaseSchema } from './base-schema';

export const UserSchema = new mongoose.Schema({
  ...BaseSchema.obj,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  status: {
    type: String,
    required: true,
    default: 'inactive',
  },
});

export const UserModel = mongoose.model('user', UserSchema);
