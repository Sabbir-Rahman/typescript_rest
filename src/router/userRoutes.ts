import { Express, Router, Request, Response } from "express";
import { createUserSessionHandler } from '../controller/session.controller';
import { createUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createSessionSchema } from '../schema/sessions.schema';
import { createUserSchema } from "../schema/user.schema";

const router = Router()

router.post('/create',validate(createUserSchema), createUserHandler)
router.post('/createSession',validate(createSessionSchema), createUserSessionHandler)


export default router