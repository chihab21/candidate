const express = require("express");
const cors = require("cors");
require("./config/connect");
const multer = require("multer");

// Multer Configurations

var indexRouter = require("./routes/index");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use("/uploads", express.static(__dirname + "/uploads/"));

//app.use("/user", userRoute);
// app.use("/poste", posteRoute);
// app.use("/images", imageRoute);
// app.use("/condidat", condidatRoute);
// app.use("/send", mailRoute);

// app.use("/", (req, res) => {
//   res.send("work fine ");
// });
app.use("/api", indexRouter);

module.exports = app;
