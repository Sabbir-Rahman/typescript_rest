import { Request, Response } from "express";
import { createSession, findSessions, updateSessions } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import config from 'config'
import { signJwt } from '../utils/jwt.utils';

export async function createUserSessionHandler (req:Request, res:Response) {
  // validate the user's password
  const user = await validatePassword(req.body.email,req.body.password)
  if(!user) {
    return res.status(401).send("Invalid email or password")
  }
  // create a session
  const session =await createSession(String(user._id), req.get("user-agent")|| "")
  
  
  // create an access token
  const accessToken = signJwt(
    {...user, session: session._id,},
    { expiresIn: config.get("accessTokenTtl")}  
  )

  // create a refresh token
  const refreshToken = signJwt(
    {...user, session: session._id,},
    { expiresIn: config.get("refreshTokenTtl")}  
  )

  // return access and refresh tokens
    return res.send({ accessToken, refreshToken})
}

export  async function getUserSessionHandler(req:Request, res:Response) {
  const userId = res.locals.user._id 

  const session = await findSessions({ user: userId ,valid: true})

  return res.send(session)
}

export async function deleteSessionHandler(req: Request, res:Response) {
  const sessionId = res.locals.user.session 

  await updateSessions({_id: sessionId }, { valid: false})

  return res.send({
    accessToken: null,
    refreshToken: null
  }).status(200)
}