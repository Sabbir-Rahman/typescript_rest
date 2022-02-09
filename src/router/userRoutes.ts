import { Express, Router, Request, Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = Router()

router.post('/create',validate(createUserSchema), createUserHandler)


export default router