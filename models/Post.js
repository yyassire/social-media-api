import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    desc: { type: String },
    img: { type: String },
    userId: { type: String },
    username: { type: String },
    city: { type: String },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
