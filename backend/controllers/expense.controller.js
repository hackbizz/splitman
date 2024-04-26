import multer from "multer";
import pool from "../config/db.config.js";
import path from "path";
import fs from "fs";

import { ErrorHandler } from "../middlewares/error.js";
import ExpenseService from "../services/expense.service.js";
export const createExpense = async (req, res, next) => {
    try {
        const { expense_name, expense_amount, expense_description, payer_id, group_id, split_type } = req.body;

        const recipient = JSON.parse(req.body.recipient);
        
        const image = `${process.env.URL}/ExpenseImage/${req.file.filename}`;
        if (!expense_name?.trim()) {
            next(new ErrorHandler("Please provide Expense name", 400));
        } else if (!expense_amount?.trim()) {
            next(new ErrorHandler("Please provide Expense Amount", 400));
        } else if (!expense_description?.trim()) {
            next(new ErrorHandler("Please provide Expense Description", 400));
        } else if (!payer_id?.trim()) {
            next(new ErrorHandler("Please provide Payee Id", 400));
        } else if (!group_id?.trim()) {
            next(new ErrorHandler("Please provide Group Id", 400));
        } else if (!split_type?.trim()) {
            next(new ErrorHandler("Please provide Split Type", 400));
        }

        const createExpense = await ExpenseService.createExpense({
            expense_name,
            expense_amount,
            expense_description,
            payer_id,
            group_id,
            split_type,
            image,
            recipient,
          });
          res.status(201).json({
            success: true,
            message: `Expense Created successfully!`,
            ExpenseId: createExpense,
          });

    } catch (error) {
        next(error);
    }
}

const storage = multer.diskStorage({
    destination: "./upload/ExpenseImage",
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