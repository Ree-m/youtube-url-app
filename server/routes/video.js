const express = require("express");
const app = express();
const router = express.Router();
const videoController = require("../controllers/video.js");


router.get("/", videoController.getAllVideos);
router.post("/share", videoController.addVideo);

module.exports = router;
