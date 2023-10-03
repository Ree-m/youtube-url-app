const User = require("../models/User.js");


exports.addUser = async (req, res) => {
  console.log("req.body", req.body);
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
      res.status(400).json({ message: error });
    }
  }
};
