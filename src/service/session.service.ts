import SessionModel from "../models/session/session";
import { SessionDoc } from '../models/session/session.interface';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { verifyJwt, signJwt } from '../utils/jwt.utils';
import { get } from 'lodash';
import { findUser } from './user.service';
import config from 'config'

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId,valid:true, userAgent})

  return session.toJSON()
  
}

export async function findSessions(query: FilterQuery<SessionDoc>) {
  return SessionModel.find(query).lean()
}

export async function updateSessions(query: FilterQuery<SessionDoc>,update: UpdateQuery<SessionDoc>) {
  return SessionModel.updateOne(query, update)
}

export async function reIssueAccessToken({refreshToken}:{
  refreshToken : string
}){
  const {decoded} = verifyJwt(refreshToken)
  
  if(!decoded || !get(decoded, 'session')) return false 

  const session = await SessionModel.findById(get(decoded, "session"))

  if (!session || !session.valid) return false 

  const user = await findUser({_id: session.user})
  
  if(!user) return false 

   const accessToken = signJwt(
    {...user, session: session._id,},
    { expiresIn: config.get("accessTokenTtl")}  
  )

  return accessToken
}