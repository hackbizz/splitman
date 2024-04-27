import multer from "multer";
import pool from "../config/db.config.js";
import path from "path";
import fs from "fs";

import { ErrorHandler } from "../middlewares/error.js";
import GroupService from "../services/group.service.js";
export const createGroup = async (req, res, next) => {
  try {
    const { group_name, group_description, creator_id } = req.body;

    const participants = JSON.parse(req.body.participants);

    const image = `${process.env.URL}/GroupImage/${req.file.filename}`;
    if (!group_name?.trim()) {
      next(new ErrorHandler("Please Provide Group Name", 400));
    } else if (!group_description?.trim()) {
      next(new ErrorHandler("Please Provide Group Description", 400));
    } else if (participants.length == 1) {
      next(new ErrorHandler("Kindly Select Group Participants", 400));
    }

    const createGroup = await GroupService.createGroup({
      group_name,
      group_description,
      creator_id,
      image,
      participants,
    });
    res.status(201).json({
      success: true,
      message: `Group Created successfully!`,
      groupId: createGroup,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const group_id = req.params.group_id;

    await GroupService.deleteGroup(group_id);

    res.status(201).json({
      success: true,
      message: `Group Deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
};
export const addMemberGroup = async (req, res, next) => {
  try {
    const participants = req.body.participants;
    const group_id = req.body.group_id;

    await GroupService.addMemberGroup({ participants, group_id });
    return res.status(201).json({
      success: true,
      message: `Members Added successfully!`,
    });
  } catch (error) {
    next(error);
  }
};
export const removeMemberGroup = async (req, res, next) => {
  try {
    const participants = JSON.parse(req.body.participants);
    const group_id = req.body.group_id;

    await GroupService.removeMemberGroup({ participants, group_id });
    return res.status(201).json({
      success: true,
      message: `Members Removed successfully!`,
    });
  } catch (error) {
    next(error);
  }
};

export const addMessageGroup = async (req, res, next) => {
  try {
    const { group_id, sender_id, message } = req.body;

    await GroupService.addMessageGroup({ group_id, sender_id, message });

    res.status(201).json({
      success: true,
      message: `Message Sent Successfully!`,
    });
  } catch (error) {
    next(error);
  }
};

export const groupDetails = async (req, res, next) => {
  try {
    const group_id = req.params.group_id;
    const groupDetail = await GroupService.groupDetails(group_id);
    res.status(201).json({
      success: true,
      group: groupDetail,
    });
  } catch (error) {
    next(error);
  }
};

export const groupMembers = async (req, res, next) => {
  try {
    const group_id = req.params.group_id;
    const groupMembersDetail = await GroupService.groupMembersDetail(group_id);
    res.status(201).json({
      success: true,
      members: groupMembersDetail,
    });
  } catch (error) {
    next(error);
  }
};

export const usersGroups = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const usersGroups = await GroupService.usersGroups(user_id);
    res.status(201).json({
      success: true,
      members: usersGroups,
    });
  } catch (error) {
    next(error);
  }
};

export const balanceExpense = async (req, res, next) => {
  try {
      const group_id = req.params.group_id;
 
      const balanceExpense = await GroupService.balanceExpense({
          group_id,
        });
        console.log(balanceExpense);

        const toPayDetails = {}

        balanceExpense.map((data)=>{
          if(!toPayDetails[data.debtor_id]){
            toPayDetails[data.debtor_id] ={
              id: data.debtor_id,
              name:data.debtor_name,
              amount:0
            }
          }

          toPayDetails[data.debtor_id].amount += data.amount
        })

        const getPayDetails = {}

        balanceExpense.map((data)=>{
          if(!getPayDetails[data.payer_id]){
            getPayDetails[data.payer_id] ={
              id: data.payer_id,
              name:data.payer_name,
              amount:0
            }
          }

          getPayDetails[data.payer_id].amount += data.amount
        })
        

        res.status(201).json({
          success: true,
          message: `Expense Balanced successfully!`,
          toPayDetails:toPayDetails,
          getPayDetails:getPayDetails
        });

  } catch (error) {
      next(error);
  }
};

const storage = multer.diskStorage({
  destination: "./upload/GroupImage",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({
  storage: storage,
});
