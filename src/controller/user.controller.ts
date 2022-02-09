import { Request,Response } from "express";
import { omit } from "lodash";
import logger from '../logger/logger'
import { createUser } from "../service/user.service";
import { User } from "../models/user.interface";
import { CreateUSerInput } from "../schema/user.schema";

export async function createUserHandler(req: Request<{},{},CreateUSerInput['body']>, res: Response):Promise<User|any>{
  try {
    const user = await createUser(req.body)

    return res.status(200).send(user)
  }catch(error: any){
    logger.error(error)
    return res.status(409).send(error.message)
  }
}