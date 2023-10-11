require("dotenv").config();

const express = require("express");
const auth = require("../src/controllers/auth");
const news = require("../src/controllers/news");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

// APIs Routing
app.use("/auth", auth);
app.use("/news", news);

let mongodb_connection_string = process.env.MONGODB_URI;
console.log(mongodb_connection_string);
if (!mongodb_connection_string) {
  console.error("MONGODB_URI environment variable is not set.");
  process.exit(1); // Exit the process with an error code
}
// Connections

mongoose.connect(mongodb_connection_string).then(
  () => {
    console.log("Mongoose connected sucessfully ");
  },
  (error) => {
    console.log("Could not connect Mongoose to database : " + error);
  }
);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port - ${PORT}`);
  }
});
