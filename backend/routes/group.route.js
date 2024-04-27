import express from "express";

import {
  addMemberGroup,
  addMessageGroup,
  createGroup,
  deleteGroup,
  removeMemberGroup,
  groupDetails,
  groupMembers,
  usersGroups,
  upload,
  balanceExpense,
} from "../controllers/group.controller.js";

const groupRouter = express.Router();
groupRouter.post("/create", upload.single("GroupImage"), createGroup);
groupRouter.post("/addMemberGroup", addMemberGroup);
groupRouter.post("/addMessageGroup", addMessageGroup);
groupRouter.delete("/removeMemberGroup", removeMemberGroup);
groupRouter.delete("/delete/:group_id", deleteGroup);
groupRouter.get("/groupDetails/:group_id", groupDetails);
groupRouter.get("/groupMembers/:group_id", groupMembers);
groupRouter.get("/usersGroups/:user_id", usersGroups);
groupRouter.get("/groupBalance/:group_id", balanceExpense);

export default groupRouter;
