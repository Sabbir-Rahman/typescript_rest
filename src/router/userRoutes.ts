import { Express, Router, Request, Response } from "express";
import { createUserSessionHandler, getUserSessionHandler } from '../controller/session.controller';
import { createUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createSessionSchema } from '../schema/sessions.schema';
import { createUserSchema } from "../schema/user.schema";
import deserializeUser from '../middleware/deserializedUser';
import requireUser from '../middleware/requireUser';

const router = Router()

router.post('/create',validate(createUserSchema), createUserHandler)
router.post('/createSession',validate(createSessionSchema), createUserSessionHandler)
router.get('/getSession',[deserializeUser,requireUser], getUserSessionHandler)


export default router