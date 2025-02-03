import mongoose from 'mongoose';

export const BaseSchema = new mongoose.Schema({
  createdAt: String,
  updatedAt: String,
  deletedAt: String,
});
