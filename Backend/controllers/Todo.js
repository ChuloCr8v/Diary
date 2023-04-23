import { createError } from "../error.js";
import Todo from "../models/Todo.js";

//create new todo
export const newTodo = async (req, res, next) => {
  const todo = new Todo({ userId: req.user.user_id, ...req.body });
  try {
    const newTodo = await todo.save();
    res.status(200).json({
      message: "Todo added sucessfully",
      data: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

//update todo

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return next(createError(404, "todo not found"));
    if (todo.userId !== req.user.user_id)
      return next(createError(401, "you can only edit your own todo"));
    const updateTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      message: "todo updated successfully",
      data: updateTodo,
    });
  } catch (error) {
    next(error);
  }
};

//delete todo

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return next(createError(404, "Todo not found"));
    if (todo.userId !== req.user.user_id)
      return next(createError(401, "You can only delete your todo"));

    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `${todo.todo} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

//getTodos

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      message: "Here are your todos",
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};
