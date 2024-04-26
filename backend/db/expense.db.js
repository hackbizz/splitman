import pool from "../config/db.config.js";
import fs from "fs";
export const createExpenseDb = async ({
    expense_name,
    expense_amount,
    expense_description,
    payer_id,
    group_id,
    split_type,
    image,
    recipients
}) => {
    const result = await pool.query(
        "INSERT INTO expense_creation ( expense_name, total_amount, expense_description, payer_id, group_id, split_type, bill_receipt ) VALUES ($1, $2 , $3, $4, $5, $6, $7) RETURNING *",
        [expense_name, expense_amount, expense_description, payer_id, group_id, split_type, image]
      );

    const expense_id = result.rows[0].expense_id;

    
}