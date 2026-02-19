import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const createUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

  createUserSchema.pre("save", async function () {
  if (!this || !this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

export const createUserModel = mongoose.model('Users', createUserSchema);
