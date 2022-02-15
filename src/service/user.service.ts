const bcrypt = require('bcrypt')

import UserModel from "../models/user/user"
import { UserDoc, User } from "../models/user/user.interface";
import { hashPass } from "../utils/bcrypt";
import { stringify } from "querystring";
import { omit } from "lodash";
import { FilterQuery } from 'mongoose';

export async function createUser(input: User) {
  try {
    const hashPassword = await hashPass(input.password)
    
    const newUser:User = {
      name: input.name,
      email: input.email,
      password: String(hashPassword)
    }
    
    return await UserModel.create(newUser)
  }catch(error: any){
    throw new Error(error)
  }
  
}

export async function validatePassword( email:string, password:string) {
  const user = await UserModel.findOne({ email })

  if(!user) {
    return false
  }

  const isValid = await bcrypt.compare(password,user.password)

  if(!isValid)
    return false
  return omit(user.toJSON(),'password')
  
}

export async function findUser(query: FilterQuery<UserDoc>){
  return UserModel.findOne(query).lean()
}