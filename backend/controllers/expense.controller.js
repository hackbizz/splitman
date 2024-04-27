import multer from "multer";
import pool from "../config/db.config.js";
import path from "path";
import fs from "fs";

import { ErrorHandler } from "../middlewares/error.js";
import ExpenseService from "../services/expense.service.js";
export const createExpense = async (req, res, next) => {
    try {
        const { expense_name, expense_amount, expense_description, payer_id, group_id, split_type } = req.body;

        const recipients = JSON.parse(req.body.recipients);
        
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
            recipients,
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

export const updateExpense = async (req, res, next) => {
    try {
        const { expense_name, expense_amount, expense_description, payer_id, group_id, split_type, expense_id } = req.body;

        const recipients = JSON.parse(req.body.recipients);
        
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

        const updateExpense = await ExpenseService.updateExpense({
            expense_name,
            expense_amount,
            expense_description,
            payer_id,
            group_id,
            split_type,
            image,
            recipients,
            expense_id
          });
          res.status(201).json({
            success: true,
            message: `Expense Updated successfully!`,
            ExpenseId: updateExpense,
          });

    } catch (error) {
        next(error);
    }
}

export const fetchExpense = async (req, res, next) => {
  try {
      const group_id = req.params.group_id;
 
      const fetchExpense = await ExpenseService.fetchExpense({
          group_id,
        });
        res.status(201).json({
          success: true,
          message: `Expense Fetched successfully!`,
          ExpenseId: fetchExpense,
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