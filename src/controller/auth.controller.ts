import {Request, Response} from "express";
import * as authService from '../services/auth.service';


export const authenticateUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log("Login request:", username, password);

    try {
        const authTokens = await authService.authenticateUser(username, password);

        if (!authTokens) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        return res.status(200).json({
            message: "Login successful",
            ...authTokens
        });
    } catch (err) {
        console.error("Error during authentication:", err);
        return res.status(500).json({ error: "Server error" });
    }
};


export const registerUser = (req: Request, res: Response) => {
    const {username, password} = req.body;
    const user = authService.registerUser(username, password);

    if (!user) {
        res.status(400).json({error: "User registration failed"});
        return;
    }
    res.status(201).json({message: "User registered successfully", user});
}