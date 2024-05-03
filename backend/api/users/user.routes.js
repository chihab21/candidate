module.exports = (app) => {
  const userController = require("./user.controllers");
  var router = require("express").Router();
  const myMulter = require("../../middleware/Multer");
  const { checkToken } = require("../../middleware/tokenValidation");

  //= ===============================
  // Public routes

  //= ===============================
  //TODO add to swagger
  router.get("/", checkToken, userController.getAllUsers);
  router.get("/:id", checkToken, userController.getUserById);
  router.put("/:id", checkToken, userController.updateUserById);
  router.delete("/:id", checkToken, userController.deleteUserById);
  router.get("/role/admin", checkToken, userController.getAdminUsers);
  router.get("/my-condidats/:userId", checkToken, userController.getUserCondidats);
  router.patch("/update-image", checkToken, myMulter, userController.updateUserImageById);

  app.use("/users", router);
};
