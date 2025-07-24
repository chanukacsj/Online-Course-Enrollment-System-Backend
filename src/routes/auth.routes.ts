import {Router} from "express";
import {authenticateUser, registerUser} from "../controller/auth.controller";

const authRouter:Router = Router();

authRouter.post("/login", authenticateUser);
authRouter.post("/register",registerUser);

export default authRouter;