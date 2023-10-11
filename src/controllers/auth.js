require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    let { name, email, password, newsPreference } = req.body;
    const hash = bcrypt.hashSync(password, 8);
    const user = new User({
      name,
      password: hash,
      email,
      newsPreference,
    });
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const { _id, name, email } = user;
      const token = jwt.sign({ _id, name, email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).send({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
