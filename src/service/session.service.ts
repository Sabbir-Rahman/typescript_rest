import SessionModel from "../models/session/session";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId,valid:true, userAgent})

  return session.toJSON()
  
}