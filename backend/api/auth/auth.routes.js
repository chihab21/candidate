module.exports = (app) => {
  const userController = require("./auth.controllers");
  var router = require("express").Router();
  const upload = require("../../middleware/Multer");

  //= ===============================
  // Public routes
  //myMulter.uploadImg.single("image")
  //= ===============================
  //TODO add to swagger
  router.post("/register", upload, userController.register);

  router.post("/login", userController.login);

  app.use("/", router);
};
