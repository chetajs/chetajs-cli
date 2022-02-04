import { Router } from "express";
import authRoutes from "./authRoutes"
import userRoutes from "./userRoutes"

const appRouter = Router();

appRouter.use('/auth', authRoutes)
appRouter.use('/user', userRoutes)


export default appRouter;