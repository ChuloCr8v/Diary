import express from "express";
import {
  deleteTodo,
  getTodos,
  newTodo,
  updateTodo,
} from "../controllers/Todo.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//new todo route

router.post("/new-todo", verifyToken, newTodo);

//update todo route
router.put("/update-todo/:id", verifyToken, updateTodo);

//delete todo route
router.delete("/:id", verifyToken, deleteTodo);

//get todo route
router.get("/my-todos", verifyToken, getTodos);

export default router;
