require("dotenv").config();

const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const axios = require("axios");
const router = express.Router();
const user = require("../models/user");

const apiKey = process.env.NEWS_API_KEY;

router.get("/news", authenticateToken, async (req, res) => {
  try {
    const { _id } = req.user;
    const respose = await fetchUserData(_id);

    const category = respose.newsPreference;

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        category,
        language: "en",
        apiKey,
      },
    });

    const articles = response.data.articles;
    res.json({ articles });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/preferences", authenticateToken, async (req, res) => {
  try {
    const { _id } = req.user;
    const respose = await fetchUserData(_id);
    res
      .status(200)
      .send({ id: response._id, preferedNews: respose.newsPreference });
  } catch (error) {
    return error;
  }
});

router.put("/preferences", authenticateToken, async (req, res) => {
  try {
    let { name, email, password, newsPreference } = req.body;
    console.log(req.body);
    let userData;
    if (password) {
      userData = await fetchUserData(_id);
      const passwordMatch = await bcrypt.compare(password, userData.password);
      console.log(passwordMatch);
      if (!passwordMatch) {
        res
          .status(401)
          .send("Password did not match, please provide correct password");
      }
    }
    const hash = bcrypt.hashSync(password, 8);
    const user = new User({
      name,
      password: hash,
      email,
      newsPreference,
    });
    console.log(req.body);
    const ret = await user.update({ _id: userData._id }, user);
    res.status(200).send(ret);
  } catch (error) {
    return error;
  }
});

async function fetchUserData(_id) {
  const response = await user.findOne({ _id });
//   console.log(response.newsPreference);
  return response;
}
module.exports = router;
