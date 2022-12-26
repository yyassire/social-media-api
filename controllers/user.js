import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(createError(403, "You are not authorized!"));
  }
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id || !req.user.isAdmin) {
    return next(createError(403, "You are not authorized!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
// follow user
export const followUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    return res.status(200).json("you cant follow yourself");
  }
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    if (!user.followers.includes(req.user.id)) {
      await user.updateOne({ $push: { followers: req.user.id } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      res.status(200).json("user has been followed");
    } else {
      res.status(403).json("you allready follow this user");
    }
  } catch (err) {
    next(err);
  }
};
// unfollow user
export const unfollowUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    return next(createError(403, "you cant unfollow yourself"));
  }
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    if (user.followers.includes(req.user.id)) {
      await user.updateOne({ $pull: { followers: req.user.id } });
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      res.status(200).json("user has been unfollowed");
    } else {
      next(createError(403, "you are not following this user"));
    }
  } catch (err) {
    next(err);
  }
};
