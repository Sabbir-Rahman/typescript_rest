import UserModel from "../models/user.model";
import { UserDoc, User } from "../models/user.interface";
import { hashPass } from "../utils/bcrypt";
import { stringify } from "querystring";

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