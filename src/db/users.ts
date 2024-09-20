import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true },
    sessionToken: { type: String, select: true },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: number | string) => UserModel.findById(id);
export const createUser = async (values: Record<string, any>) =>
  (await new UserModel(values).save()).toObject();
export const deleteUserById = (id: number | string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (
  id: number | string,
  values: Record<string, any>
) => UserModel.findByIdAndUpdate(id, values);
