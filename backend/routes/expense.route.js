import express from "express";

import {
  createExpense,
  fetchExpense,
  updateExpense,
  upload
} from "../controllers/expense.controller.js";

const expenseRouter = express.Router();
expenseRouter.post("/create", upload.single("ExpenseImage"), createExpense);
expenseRouter.put("/update", upload.single("ExpenseImage"), updateExpense);
expenseRouter.get("/fetchExpenses/:group_id", fetchExpense);

export default expenseRouter;
