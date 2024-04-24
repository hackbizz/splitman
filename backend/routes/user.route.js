import express from "express";
import {
  createUser,
  getAccessFromRefresh,
  login,
  logout,
  getUserNameFromRegex,
  upload,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("UserImage"), createUser);
userRouter.get("/getAccessFromRefresh", getAccessFromRefresh);
userRouter.post("/login", login);
userRouter.post("/logout", authenticateToken, logout);
userRouter.get("/users/:regex", getUserNameFromRegex);

export default userRouter;
