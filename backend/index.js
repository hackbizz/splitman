import express from "express";
import env from "dotenv";
import cors from "cors";
import http from "http";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import userRouter from "./routes/user.route.js";
import { ErrorMiddleware } from "./middlewares/error.js";
import { swaggerDocument } from "./docs/index.js";
import swaggerUiExpress from "swagger-ui-express";
import friendRouter from "./routes/friend.route.js";
import groupRouter from "./routes/group.route.js";
import expenseRouter from "./routes/expense.route.js";

env.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/UserImage", express.static("upload/UserImage"));
app.use("/GroupImage", express.static("upload/GroupImage"));
app.use("/ExpenseImage", express.static("upload/ExpenseImage"));
app.use("/api/user", userRouter);

app.use("/api/friends", friendRouter);
app.use("/api/groups", groupRouter);
app.use("/api/expenses", expenseRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(ErrorMiddleware);
