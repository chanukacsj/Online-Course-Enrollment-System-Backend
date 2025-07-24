import mongoose, { Document } from "mongoose";
import { UserDto } from "../dto/user.dto";

type UserDocument = UserDto & Document;

// Define schema first
const UserSchema = new mongoose.Schema<UserDocument>({
    id: { type: Number, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" }
});

// Create model using IUser interface
const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
