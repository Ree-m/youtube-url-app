const express = require("express");
const app = express();
const router = express.Router();
const userController = require("../controllers/user.js");


router.post("/add", userController.addUser);
router.post("/login", userController.login);
router.get("/profile", userController.getProfile);


module.exports = router;