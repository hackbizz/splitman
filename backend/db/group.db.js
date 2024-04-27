import pool from "../config/db.config.js";
import fs from "fs";
export const createGroupDb = async ({
  group_name,
  group_description,
  creator_id,
  image,
  participants,
}) => {
  const result = await pool.query(
    "INSERT INTO groups ( group_name, group_icon ,group_description , creator_id ) VALUES ($1, $2 ,$3,$4) RETURNING *",
    [group_name, image, group_description, creator_id]
  );

  const group_id = result.rows[0].group_id;

  const participantInsertQuery = `
    INSERT INTO group_participants (group_id, user_id)
    VALUES ($1, $2);
  `;

  // participants.forEach(async (participant_name) => {
  //   try {

  //     const result = await pool.query(
  //       "INSERT INTO group_participants (group_id, user_id) VALUES ($1, $2) RETURNING *",
  //       [group_id, participant_id]
  //     );
  //   } catch (error) {
  //     console.error("Error adding participant:", error);
  //   }
  // });

  for (const participant of participants) {
    const { rows: user } = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [participant]
    );

    if (user.length > 0) {
      const userId = user[0].id;
      await pool.query(participantInsertQuery, [group_id, userId]);
    }
  }

  await pool.query(participantInsertQuery, [group_id, creator_id]);

  return result.rows;
};
export const deleteGroupDb = async (group_id) => {
  const { rows: group } = await pool.query(
    "SELECT * FROM groups WHERE group_id = $1",
    [group_id]
  );

  const img_url = group[0].group_icon.split("GroupImage/")[1];

  try {
    await fs.promises.unlink(`./upload/GroupImage/${img_url}`);
  } catch (error) {
    console.error("Error deleting icon:", error);
  }

  const result = await pool.query(
    "DELETE FROM group_participants WHERE group_id = $1",
    [group_id]
  );

  await pool.query("DELETE FROM group_conversations WHERE group_id = $1", [
    group_id,
  ]);

  await pool.query("DELETE FROM groups WHERE group_id = $1", [group_id]);

  return result.rows;
};
export const addMemberGroupDb = async ({ participants, group_id }) => {
  const participantInsertQuery = `
    INSERT INTO group_participants (group_id, user_id)
    VALUES ($1, $2);
  `;
  
  for (const participant of participants) {
    const { rows: user } = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [participant]
    );

    if (user.length > 0) {
      const userId = user[0].id;
      await pool.query(participantInsertQuery, [group_id, userId]);
    }
  };
};

export const removeMemberGroupDb = async ({ participants, group_id }) => {
  for (const participant_id of participants) {
    try {
      const result = await pool.query(
        "DELETE FROM group_participants WHERE group_id = $1 AND user_id = $2",
        [group_id, participant_id]
      );
    } catch (error) {
      console.log(error);
    }
  }
};

export const addMessageGroupDb = async ({ group_id, sender_id, message }) => {
  const result = await pool.query(
    "INSERT INTO group_conversations (group_id,sender_id,message) VALUES ($1,$2,$3)",
    [group_id, sender_id, message]
  );

  return result.rows;
};
export const groupDetailsDb = async (group_id) => {
  const result = await pool.query("SELECT * FROM groups WHERE group_id = $1", [
    group_id,
  ]);

  return result.rows;
};
export const groupMembersDetailDb = async (group_id) => {
  const result = await pool.query(
    "SELECT u.*,gp.group_id FROM group_participants gp JOIN users u ON u.id = gp.user_id WHERE gp.group_id = $1",
    [group_id]
  );

  return result.rows;
};
export const usersGroupsDb = async (user_id) => {
  const result = await pool.query(
    "SELECT DISTINCT g.* FROM groups g JOIN group_participants gp ON g.group_id = gp.group_id WHERE gp.user_id = $1",
    [user_id]
  );

  return result.rows;
};
export const balanceExpenseDb = async ({group_id}) => {
  const result = await pool.query(
    `SELECT 
    ep.*, 
    e.expense_id,
    payer.name AS payer_name,
    debtor.name AS debtor_name
  FROM 
    expense_creation e 
  JOIN 
    expense_participants ep ON ep.expense_id = e.expense_id 
  JOIN
    users payer ON ep.payer_id = payer.id
  JOIN
    users debtor ON ep.debtor_id = debtor.id
  WHERE 
    e.group_id = $1`,
    [group_id]
  );

  return result.rows;
};
