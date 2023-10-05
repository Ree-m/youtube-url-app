const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors=require("cors")
const mainRoutes = require("./routes/main.js");
const userRoutes = require("./routes/user.js");
const videoRoutes = require("./routes/video.js");

require("dotenv").config();

// midllewares
app.use(express.json());
console.log("allowed origin",process.env.ALLOWED_ORIGIN)
app.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGIN }));

app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/video", videoRoutes);


// Connect to database
mongoose.connect(process.env.DB_STRING, console.log("DB is connected"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
