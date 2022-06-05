const protectRoute = require("./middleware/protectRoute");
// import axios from "axios";

const express = require("express");
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

const booksApp = express.Router();

booksApp.use(express.json());

// get all books
booksApp.get(
  "/all-books",
  protectRoute,
  asyncHandler(async (req, res) => {
    try {
      let books = await Post.find().populate({
        path: "comments",
        ref: "Comment",
        populate: [
          {
            path: "commentedBy",
            ref: "User",
            select: "-password",
          },
        ],
      });

      res.send({ message: "success", books });
    } catch (e) {
      res.send({ message: "error", reason: e.message });
    }
  })
);

module.exports = booksApp;
