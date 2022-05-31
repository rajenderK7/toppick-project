const User = require("../../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// protect middleware
const protectRoute = asyncHandler(
  asyncHandler(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        // validate the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({ username: decoded.username });
        // if (user === null) {
        //   //   res.status(401).json("You are not allowed to access this route.");
        //   res.send({ message: "You are not allowed to access this route." });
        // }
        // if authorized
        if (user) {
          next();
        }
      } catch (error) {
        res.send({ message: error.message });
      }
    }

    if (!token)
      res.send({ message: "You are not allowed to access this route." });
  })
);

module.exports = protectRoute;
