import UserModel from "../model/user.model";
import {UserDto} from "../dto/user.dto";


export const getUserById =  async (id: number): Promise<UserDto | null> => {
    return await UserModel.findOne({id}).lean();
}


export const getAllUsers = async () => UserModel.find();

export const updateUserByEmail = async (email: string, userData: any) => {
    return await UserModel.findOneAndUpdate({email}, userData, {new: true});
};

export const deleteUserByEmail = async (email: string) => {
    return await UserModel.findOneAndDelete({email});
};