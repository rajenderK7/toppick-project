const express = require("express");
const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

const commentApp = express.Router();

commentApp.use(express.json());

// post comment
commentApp.post(
  "/books/:id",
  asyncHandler(async (req, res) => {
    // get post id (post == book or movie)
    const postId = req.params.id;
    const text = req.body.text;

    try {
      const user = await User.findOne({ username: req.body.username });
      // create new comment
      const comment = new Comment({
        comment: text,
        commentedBy: user._id,
        postId: postId,
      });

      // save comment
      await comment.save();

      // add the comment to target post
      const post = await Post.findById(postId);

      post.comments.push(comment);

      await post.save();
      // res.redirect("success");
      res.send({ message: "success" });
    } catch (e) {
      console.log(e.message);
      res.send({ message: "error", error: e.message });
    }
  })
);

module.exports = commentApp;
