import pool from "../config/db.config.js";

export const getUserFromUsernameDb = async ({ username }) => {
  const user = await pool.query(
    "SELECT username FROM users WHERE username LIKE $1",
    [`%${username}%`]
  );
  return user;
};
export const getUserNameFromRegexDb = async (regex) => {
  const user = await pool.query(
    "SELECT username FROM users WHERE username LIKE $1",
    [`%${regex}%`]
  );
  return user.rows;
};
