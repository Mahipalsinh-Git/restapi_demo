import { bool, string } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
      unique: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      minlength: 2,
      maxlength: 200,
      required: [true, "password is required"],
      select: false,
    },
    role: {
      type: string,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
    isVerified: {
      type: bool,
      default: false,
      select: false,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
