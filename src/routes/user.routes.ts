import {Router} from "express";
import { getAllUsers, updateUser, deleteUser } from "../controller/user.controller";
import {authorizeRole} from "../middleware/auth.middleware";

const userRouter: Router = Router();

userRouter.get("/all",authorizeRole('admin'), getAllUsers);
userRouter.put("/update/:email",authorizeRole('admin'), updateUser);
userRouter.delete("/delete/:email",authorizeRole('admin'), deleteUser);

export default userRouter;