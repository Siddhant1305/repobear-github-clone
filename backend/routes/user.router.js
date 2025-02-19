const express = require("express");
const UserController = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.get("/allUsers", UserController.getAllUsers);
userRouter.post("/signup", UserController.signup);
userRouter.post("/login", UserController.login);
userRouter.get("/userProfile", UserController.getUserProfile);
userRouter.put("/updateProfile", UserController.updateUserProfile);
userRouter.delete("/deleteProfile", UserController.deleteUserProfile);

module.exports = userRouter;