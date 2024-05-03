const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://chihabghlala49:azerty21@cluster0.dvepv2f.mongodb.net/")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = mongoose;
//hxFTL6BDEGpVnYIQ
