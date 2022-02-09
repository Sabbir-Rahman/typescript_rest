import { Schema, model, Model } from 'mongoose';

import { User, UserDoc } from './user.interface'

const userSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    password: { type: String, required: true}
  },
  {
    timestamps: true,
  }
)

const UserModel = model<UserDoc>('users', userSchema) 

export default UserModel