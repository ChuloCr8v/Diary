import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    todo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("todo", TodoSchema);
