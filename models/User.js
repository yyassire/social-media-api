import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    coverPi: { type: String },
    profilePi: { type: String },
    city: { type: String },
    website: { type: String },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
