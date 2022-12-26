import Story from "../models/Story.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const createStory = async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  const newStory = new Story({
    img: req.body.img,
    userId: req.user.id,
    userName: currentUser.username,
  });
  try {
    const savedStory = await newStory.save();
    res.status(200).json(savedStory);
  } catch (err) {
    next(err);
  }
};
export const getStory = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const stories = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Story.find({ userId: friendId });
      })
    );
    res.status(200).send(stories);
  } catch (error) {
    next(error);
  }
};
