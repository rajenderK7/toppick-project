const express = require("express");
const mongoose = require("mongoose");
const userApp = require("./api/userApi");
const booksApp = require("./api/booksApi");
const path = require("path");

require("dotenv").config();

const DB_URL = process.env.DB_URL;
// DB connection
mongoose
  .connect(DB_URL)
  .then(() => console.log("DB connection successful"))
  .catch((e) => console.log(e.message));

// create the server
const app = express();

// connect the build folder to node
app.use(express.static(path.join(__dirname, "./build")));

// redirect to target api
app.use("/user-api", userApp);
app.use("/books-api", booksApp);

// dealing with page refresh
// send build/index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// Invalid path
app.use((req, res, next) => {
  res.send({ error: `Invalid path: ${req.url}` });
});

// Dealing with errors
app.use((err, req, res, next) => {
  res.send({ error: "Error occured", reason: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`));
