import SessionModel from "../models/session/session";
import { SessionDoc } from '../models/session/session.interface';
import { FilterQuery, UpdateQuery } from 'mongoose';

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