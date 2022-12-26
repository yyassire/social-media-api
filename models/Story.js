import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    img: { type: String },
    userId: { type: String },
    user: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Story", StorySchema);
