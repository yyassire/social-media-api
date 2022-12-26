import verifyToken from "../utils/tokenAuth.js";
import {
  createPost,
  updateUser,
  deletePost,
  getPost,
  likeDislikePost,
  userPosts,
  currentUserPosts,
  userTimeLine,
  addComment,
} from "../controllers/post.js";
import express from "express";
const router = express.Router();
//create a post
router.post("/", verifyToken, createPost);
//update a post
router.put("/:id", verifyToken, updateUser);
//delete a post
router.delete("/:id", verifyToken, deletePost);
//get a post
router.get("/:id", verifyToken, getPost);
//like / dislike a post
router.put("/:id/like", verifyToken, likeDislikePost);
//get user's all posts
router.get("/profile/:username", verifyToken, userPosts);
//get current user's all posts
router.get("/", verifyToken, currentUserPosts);
//get timeline posts
router.get("/user/timeline", verifyToken, userTimeLine);
// comment a post
router.post("/comment", verifyToken, addComment);

export default router;
