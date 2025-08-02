import * as userService from '../services/user.service';
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const updatedUser = await userService.updateUserByEmail(email, req.body);
        res.status(200).json({
            message: "User updated",
            user: updatedUser
        });
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        console.log(req.params.email, "email in deleteUser controller");
        await userService.deleteUserByEmail(email);
        res.json({ message: "User deleted" });
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ message: error.message });
    }
};