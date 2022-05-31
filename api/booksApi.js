const protectRoute = require("./middleware/protectRoute");
// import axios from "axios";

const express = require("express");
const asyncHandler = require("express-async-handler");
const { default: axios } = require("axios");

const booksApp = express.Router();

booksApp.use(express.json());

const booksURI =
  "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=";

// get all books
booksApp.get(
  "/all-books",
  protectRoute,
  asyncHandler(async (req, res) => {
    try {
      let response = await axios.get(
        booksURI + process.env.REACT_APP_BOOKS_API_KEY
      );
      let books = response.data.results.books;
      res.send({ message: "success", books });
    } catch (e) {
      res.send({ message: "error", reason: e.message });
    }
  })
);

module.exports = booksApp;
