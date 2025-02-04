import mongoose, { mongo } from 'mongoose';
import { BaseSchema } from './base-schema';

export const UserSchema = new mongoose.Schema({
  ...BaseSchema.obj,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
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
  contactNo: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model('user', UserSchema);
