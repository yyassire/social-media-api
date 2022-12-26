import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// routes import
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import storyRoute from "./routes/stories.js";
// initiate server
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
connect();
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use(cors());
app.use(express.json());
// routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/stories", storyRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 8800, () => {
  console.log("Connected to backend.");
});
