import express from "express";
import {
  addFriendsChat,
  approveFriend,
  createFriend,
  getFriendsChat,
  getMyAllCoversations,
  pendingFriendRequest,
  startNewConversation,
} from "../controllers/friend.controller.js";

const friendRouter = express.Router();

friendRouter.post("/createfriend", createFriend);
friendRouter.post("/addFriendChat", addFriendsChat);
friendRouter.get("/getFriendChat/:cId/:uId", getFriendsChat);
friendRouter.post("/startConversation", startNewConversation);
friendRouter.get("/getMyAllConversations/:uid", getMyAllCoversations);

friendRouter.get("/approveFriend/:id", approveFriend);
friendRouter.get("/pendingFriendRequest/:id", pendingFriendRequest);

export default friendRouter;
