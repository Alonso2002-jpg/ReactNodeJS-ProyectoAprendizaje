import mongoose from "mongoose";
import { number } from "zod";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priority: {
      type: mongoose.Schema.Types.Number,
      default: 1
    },
    category: {
      type: String,
      default: "Undefined",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
