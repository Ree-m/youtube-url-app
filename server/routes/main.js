const express = require("express");
const app = express();
const router = express.Router();
const mainController = require("../controllers/main.js");


router.get("/test", mainController.getTest);


module.exports = router;