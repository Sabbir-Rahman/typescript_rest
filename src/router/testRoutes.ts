import { Express, Router, Request, Response } from "express";

const router = Router()

router.get('/', (req: Request, res: Response) =>{
  res.status(200).json({'data':'This route is running'})
})


export default router