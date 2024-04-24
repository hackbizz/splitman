import pool from "../config/db.config.js";

export const createFriendDb = async ({ user_id, friend_id }) => {
  const result = await pool.query(
    "INSERT INTO friends (member_id1, member_id2, status, date) VALUES ($1, $2, 0, CURRENT_DATE) RETURNING *",
    [user_id, friend_id]
  );

  return result.rows;
};
export const startConversationDb = async ({ member1Id, member2Id }) => {
  const result = await pool.query(
    "INSERT INTO public.friends_conversations (member1_id, member2_id, start_datetime) VALUES ($1, $2, $3) RETURNING c_id",
    [member1Id, member2Id, new Date()]
  );
  return result;
};

export const checkExistDb = async ({ user_id, friend_id }) => {
  const result = await pool.query(
    "SELECT * FROM friends WHERE (member_id1 = $1 and member_id2 = $2) or (member_id1 = $2 and member_id2 = $1)",
    [friend_id, user_id]
  );

  return result.rows;
};

export const checkExistConversationDb = async ({ member1Id, member2Id }) => {
  const result = await pool.query(
    "SELECT c_id FROM public.friends_conversations WHERE (member1_id = $1 AND member2_id = $2) OR (member1_id = $2 AND member2_id = $1)",
    [member1Id, member2Id]
  );

  return result.rows;
};

export const addFriendChatDb = async ({
  conversationId,
  senderId,
  messageText,
}) => {
  const result = await pool.query(
    "INSERT INTO friends_messages (c_id, s_id, message) VALUES ($1, $2, $3) RETURNING *",
    [conversationId, senderId, messageText]
  );

  return result.rows;
};
export const getFriendChatDb = async ({ conversationId }) => {
  const result = await pool.query(
    "SELECT m.message,m.m_id ,u.image,u.id AS uid,u.name AS sender FROM friends_messages m INNER JOIN public.users u ON m.s_id = u.id WHERE m.c_id =   $1",
    [conversationId]
  );

  return result.rows;
};

export const addUnseenCountDb = async ({ conversationId }) => {
  await pool.query(
    "UPDATE public.friends_conversations SET unread_message_count = unread_message_count + 1 WHERE c_id = $1",
    [conversationId]
  );

  return true;
};

export const refreshUnseenCountDb = async ({ conversationId }) => {
  await pool.query(
    "UPDATE public.friends_conversations SET unread_message_count = 0 WHERE c_id = $1",
    [conversationId]
  );

  return true;
};

export const getAllConversationsDb = async ({ user_id }) => {
  const { rows: result } = await pool.query(
    `SELECT 
      c.c_id, 
      u.name AS friend_name,
      u.image AS friend_photo,
      c.unread_message_count,
      (
        SELECT message
        FROM friends_messages
        WHERE c_id = c.c_id
        ORDER BY friends_messages.m_id DESC
        LIMIT 1
      ) AS last_message
    FROM 
      public.friends_conversations c
    INNER JOIN 
      public.users u 
    ON 
      (CASE WHEN c.member1_id = $1 THEN c.member2_id ELSE c.member1_id END) = u.id
    WHERE 
      c.member1_id = $1 OR c.member2_id = $1`,
    [user_id]
  );

  return result;
};
export const FriendRequestExistsDb = async (friend_id) => {
  const { rows: result } = await pool.query(
    "SELECT * FROM friends WHERE friend_id = $1",
    [friend_id]
  );

  return result;
};
export const ApproveFriendRequestDb = async (friend_id) => {
  const { rows: result } = await pool.query(
    "UPDATE friends SET status = $1 WHERE friend_id = $2",
    [1, friend_id]
  );

  return result;
};
export const PendingFriendRequestDb = async (user_id) => {
  const { rows: result } = await pool.query(
    "SELECT * FROM friends WHERE member1_id = $1 OR member1_id = $1 AND status = $2",
    [user_id, "0"]
  );

  return result;
};
