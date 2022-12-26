import Post from "../models/Post.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  const newPost = new Post({
    ...req.body,
    userId: req.user.id,
    username: currentUser.username,
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId !== req.user.id) {
      return next(createError(403, "you can update only your post"));
    }
    await post.updateOne({ $set: req.body });
    res.status(200).json("the post has been updated");
  } catch (err) {
    next(err);
  }
};
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.id) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      next(createError(403, "you can delete only your post"));
    }
  } catch (err) {
    next(err);
  }
};
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};
export const likeDislikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    next(err);
  }
};

export const userPosts = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
export const currentUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.user.id });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

export const userTimeLine = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    let friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    next(err);
  }
};
export const addComment = async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: {
          comment: req.body.comment,
          name: currentUser.username,
          createdAt: Date(),
        },
      },
    });
    res.status(201).json("comment added successfully");
  } catch (error) {
    next(error);
  }
};
