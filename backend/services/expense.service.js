import { createExpenseDb } from "../db/expense.db.js";


class ExpenseService {
    static createExpense = async (data) => {
      try {
        return await createExpenseDb(data);
      } catch (error) {
        console.log(error);
        throw new ErrorHandler("Error While Database Operation", 401);
      }
    };
}
export default ExpenseService;