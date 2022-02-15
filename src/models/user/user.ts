import { Schema, model, Model } from 'mongoose';

import { User, UserDoc } from './user.interface'

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    password: { type: String, required: true}
  },
  {
    timestamps: true,
  }
)

const UserModel = model<User>('users', userSchema) as Model<UserDoc>

export default UserModel