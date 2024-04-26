import express from "express";

import {
  createExpense,
  upload
} from "../controllers/expense.controller.js";

const expenseRouter = express.Router();
expenseRouter.post("/create", upload.single("ExpenseImage"), createExpense);

export default expenseRouter;
