import mongoose from "mongoose";

export const createUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

export const createUserModel = mongoose.model('user', createUserSchema);
