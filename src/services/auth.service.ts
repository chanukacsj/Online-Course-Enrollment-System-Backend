import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from "../model/user.model";


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const refreshTokens = new Set<string>();

export const registerUser = async (username: string, password: string) => {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        return null;
    }

    const lastUser = await UserModel.findOne().sort({ id: -1 }).lean();
    const newId = lastUser && lastUser.id ? lastUser.id + 1 : 1;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        id: newId,
        username,
        password: hashedPassword,
        role: "customer"
    });

    await newUser.save();
    return newUser;
};

export const authenticateUser = async (username: string, password: string) => {
    const existingUser = await UserModel.findOne({ username });

    if (!existingUser) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return null;
    }

    const accessToken = jwt.sign(
        { id: existingUser.id, username: existingUser.username, role: existingUser.role },
        JWT_SECRET,
        { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
        { username: existingUser.username },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    refreshTokens.add(refreshToken);
    return { accessToken, refreshToken };
};
