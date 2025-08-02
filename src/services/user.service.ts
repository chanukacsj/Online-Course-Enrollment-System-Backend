import UserModel from "../model/user.model";

export const getAllUsers = async () => UserModel.find();

export const updateUserByEmail = async (email: string, userData: any) => {
    return await UserModel.findOneAndUpdate({ email }, userData, { new: true });
};

export const deleteUserByEmail = async (email: string) => {
    return await UserModel.findOneAndDelete({ email });
};