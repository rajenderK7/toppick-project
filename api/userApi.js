const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userApp = express.Router();
userApp.use(express.json());

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

// configure cloudinarty sotrage
const userCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, res) => {
    return {
      folder: "toppick/users",
      // public_id:  "",
    };
  },
});

var upload = multer({ storage: userCloudinaryStorage });

// create user
userApp.post(
  "/create-user",
  upload.single("profileImg"),
  expressAsyncHandler(async (req, res) => {
    // get the user object
    const userObj = JSON.parse(req.body.userObj);
    try {
      // check if the user is already present
      const userOfDB = await User.findOne({ username: userObj.username });
      // if user is already present
      if (userOfDB !== null) {
        res.send({ message: "Username is already taken" });
      } else {
        // hash the password
        let hashedPassword = await bcryptjs.hash(userObj.password, 6);
        // update the hashed password
        userObj.password = hashedPassword;
        // creating User obj
        const newUser = new User({
          username: userObj.username,
          password: userObj.password,
          profileURL: req.file.path,
        });
        // insert the user
        await newUser.save();
        res.send({ message: "user created" });
      }
    } catch (e) {
      res.send({ message: "error", error: e.message });
    }
  })
);

// @desc Login user
// @route POST /user-api/login
// @access PUBLIC
userApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    // get the user
    const userCred = req.body;
    // check if the user exists
    const userOfDB = await User.findOne({ username: userCred.username });
    // if does not exist
    if (userOfDB === null) {
      res.send({ message: "Invalid username" });
    } else {
      // check for the password
      let passwordStatus = await bcryptjs.compare(
        userCred.password,
        userOfDB.password
      );

      if (passwordStatus) {
        // sign the user
        const token = generateToken(userOfDB.username);

        const user = {
          username: userOfDB.username,
          token,
        };

        res.send({ message: "success", user: user });
      } else {
        res.send({ message: "Invalid password" });
      }
    }
  })
);

const generateToken = (cred) => {
  return jwt.sign({ username: cred }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
};

module.exports = userApp;
