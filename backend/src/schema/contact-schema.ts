import mongoose, { mongo } from 'mongoose';
import { BaseSchema } from './base-schema';

export const ContactSchema = new mongoose.Schema({
  ...BaseSchema.obj,
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: false,
  },
  contacts: {
    type: Array,
    required: false,
    default: [],
  },
  isShared: {
    type: Boolean,
    required: false,
    default: false,
  },
  photoUrl: {
    type: String,
    required: false,
    default: 'https://imageplaceholder.net/100x100',
  },
});

export const ContactModel = mongoose.model('contact', ContactSchema);
