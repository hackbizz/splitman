import {
  addFriendChatDb,
  addUnseenCountDb,
  checkExistConversationDb,
  checkExistDb,
  createFriendDb,
  getAllConversationsDb,
  getFriendChatDb,
  refreshUnseenCountDb,
  startConversationDb,
  FriendRequestExistsDb,
  ApproveFriendRequestDb,
  PendingFriendRequestDb
} from "../db/friend.db.js";

class FriendService {
  static createFriend = async (data) => {
    try {
      return await createFriendDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };

  static existFriend = async (data) => {
    try {
      return await checkExistDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };

  static addFriendChat = async (data) => {
    try {
      return await addFriendChatDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };

  static getFriendChat = async (data) => {
    try {
      return await getFriendChatDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };

  static addUnseenCount = async (data) => {
    try {
      return await addUnseenCountDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };

  static refreshUnseenCount = async (data) => {
    try {
      return await refreshUnseenCountDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };

  static checkExisingConversation = async (data) => {
    try {
      return await checkExistConversationDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };

  static startNewConversation = async (data) => {
    try {
      return await startConversationDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };

  static getAllMyConversations = async (data) => {
    try {
      return await getAllConversationsDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };

  static FriendRequestExists = async (data) => {
    try {
      return await FriendRequestExistsDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
  static ApproveFriendRequest = async (data) => {
    try {
      return await ApproveFriendRequestDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };
  static PendingFriendRequest = async (data) => {
    try {
      return await PendingFriendRequestDb(data);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler("Error While Database Operation", 401);
    }
  };


}

export default FriendService;
