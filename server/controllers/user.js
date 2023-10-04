const express = require("express");
const app = express();
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const privatekey = process.env.PRIVATE_KEY;
console.log("private key", privatekey);

// middleware
app.use(cookieParser());

exports.addUser = async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({
    email: email,
    password: password,
  });
  try {
    const newUserToSave = await newUser.save();
    return res.status(200).json(newUserToSave);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "User already exists." });
    } else {
      console.log(error);
      res.status(500).json(`Server Error:${error}`);
    }
  }
};

exports.login = async (req, res) => {
  console.log("req.body", req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }).exec();
  console.log("user", user);
  try {
    if (!user) {
      // User not found
      return res.status(400).json({ message: "Invalid login credentials." });
    } else {
      jwt.sign({ email, id: user._id }, privatekey, {}, (error, token) => {
        if (error) {
          throw error;
        } else {
          console.log("token before", token);

          res
            .cookie("token", token, {
              sameSite: "none",
              secure: true,
            })
            .json({
              id: user._id,
              email,
            });
          console.log("token after", token);
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(`Server Error: ${error}`);
  }
};

exports.getProfile = (req, res) => {
  console.log("token profile before", req.cookies);
  try {
    jwt.verify(req.cookies.token, privatekey, {}, (error, user) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid token" });
      }
      console.log(" profile user", user);

      return res.json(user);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(`Server Error: ${error}`);
  }
};

exports.logout = async (req, res) => {
  try {
    console.log("logging out");
   return res.cookie("token", "", { sameSite: "none", secure: true }).json("ok"); //sets "token" to empty/invalid
  } catch (error) {
    console.log(error);
    return res.status(500).json(`Server Error: ${error}`);
  }
};
