import {
  addMemberGroupDb,
  createGroupDb,
  deleteGroupDb,
  removeMemberGroupDb,
  addMessageGroupDb,
  groupDetailsDb,
  groupMembersDetailDb,
  usersGroupsDb,
} from "../db/group.db.js";

class GroupService {
  static createGroup = async (data) => {
    try {
      return await createGroupDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
  static deleteGroup = async (data) => {
    try {
      return await deleteGroupDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
  static addMemberGroup = async (data) => {
    try {
      return await addMemberGroupDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
  static removeMemberGroup = async (data) => {
    try {
      return await removeMemberGroupDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
  static addMessageGroup = async (data) => {
    try {
      return await addMessageGroupDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
  static groupDetails = async (data) => {
    try {
      return await groupDetailsDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
  static groupMembersDetail = async (data) => {
    try {
      return await groupMembersDetailDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
  static usersGroups = async (data) => {
    try {
      return await usersGroupsDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
}

export default GroupService;
