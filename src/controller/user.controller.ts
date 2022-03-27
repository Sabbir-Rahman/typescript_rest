import { Request,Response } from "express";
const bcrypt = require('bcrypt')
import { omit } from "lodash";
import logger from '../logger/logger'
import { createUser } from "../service/user.service";
import { User } from "../models/user/user.interface";
import { CreateUserInput } from "../schema/user.schema";
import UserModel from "../models/user/user";

export async function createUserHandler(req: Request<{},{},CreateUserInput['body']>, res: Response):Promise<User|any>{
  try {
    const user = await createUser(req.body)

    return res.status(200).send(user)
  }catch(error: any){
    logger.error(error)
    return res.status(409).send(error.message)
  }
}

export async function validatePassword(email:string, password: string):Promise<{email: string}|boolean>{
  try {
    const user = await UserModel.findOne({ email })
    if(!user) return false

    const validate = await bcrypt.compare(password, user.password);
    if(!validate) return false

    return omit(user.toJSON(),'password')

  } catch (error) {
    logger.error(error)
    return false
  }  
}