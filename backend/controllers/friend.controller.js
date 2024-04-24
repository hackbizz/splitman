import pool from "../config/db.config.js";
import FriendService from "../services/friend.service.js";

export const createFriend = async (req, res, next) => {
  try {
    const { user_id, friend_id } = req.body;
    const FriendExists = await FriendService.existFriend(req.body);

    if (FriendExists.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Friend already exist`,
      });
    }

    const result = await FriendService.createFriend(req.body);

    res.status(201).json({
      success: true,
      message: `Friend Inserted successfully!`,
      result: result,
    });
  } catch (error) {
    next(error);
  }
};

export const addFriendsChat = async (req, res, next) => {
  const { conversationId, senderId, messageText } = req.body;

  try {
    const result = await FriendService.addFriendChat(req.body);
    await FriendService.addUnseenCount({ conversationId });

    res.status(201).json({ message: "Message added successfully" });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFriendsChat = async (req, res, next) => {
  const conversationId = req.params.cId;
  const currentUserId = req.params.uId;
  try {
    const result = await FriendService.getFriendChat({ conversationId });
    const result2 = await FriendService.refreshUnseenCount({ conversationId });
    const messages = result.map((message) => ({
      message: message.message,
      m_id: message.m_id,
      image: message.image,
      sender: message.uid == currentUserId ? "ME" : message.sender,
    }));

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const startNewConversation = async (req, res, next) => {
  const { member1Id, member2Id } = req.body;

  try {
    const existingConversation = await FriendService.checkExisingConversation(
      req.body
    );

    if (existingConversation.length > 0) {
      return res.status(400).json({ error: "Conversation already exists" });
    }

    const result = await FriendService.startNewConversation(req.body);

    res.status(201).json({ msg: "Conversation started Sucessfully." });
  } catch (error) {
    console.error("Error starting conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMyAllCoversations = async (req, res, next) => {
  const user_id = req.params.uid;

  try {
    const result = await FriendService.getAllMyConversations({
      user_id: user_id,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error starting conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const approveFriend = async (req, res, next) => {
  try {
    const friend_id = req.params.id;

    const FriendRequestExists = await FriendService.FriendRequestExists(
      friend_id
    );

    if (FriendRequestExists.rows.length == 0) {
      return res.status(400).json({
        success: false,
        message: `Friend request doesn't exist`,
      });
    }

    const approvedFriendRequest = await FriendService.ApproveFriendRequest(
      friend_id
    );

    res.status(201).json({
      success: true,
      message: `Friend Request Accepted successfully!`,
      result: approvedFriendRequest,
    });
  } catch (error) {
    next(error);
  }
};
export const pendingFriendRequest = async (req, res, next) => {
  try {
    const user_id = req.params.id;

    const PendingFriends = await FriendService.PendingFriendRequest(user_id);
    if (PendingFriends.length == 0) {
      return res.status(400).json({
        success: false,
        message: `No Pending Friend Request exist`,
      });
    }

    res.status(201).json({
      success: true,
      message: `Pending Friend Requests Fetched Successfully!`,
      result: PendingFriends,
    });
  } catch (error) {
    next(error);
  }
};
