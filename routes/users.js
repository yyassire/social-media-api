import express from "express";
import User from "../models/User.js";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  followUser,
  unfollowUser,
} from "../controllers/user.js";
import verifyToken from "../utils/tokenAuth.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyToken, updateUser);

//DELETE
router.delete("/:id", verifyToken, deleteUser);

//GET
router.get("/:id", verifyToken, getUser);

//follow a user
router.get("/:id/follow", verifyToken, followUser);

//unfollow a user
router.get("/:id/unfollow", verifyToken, unfollowUser);

// //GET ALL
// router.get("/", verifyToken, getUsers);

export default router;
