import { Router } from "express";
import { authRequiered } from "../middlewares/validateToken.js";
import {
  getTasks,
  createTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middelware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", authRequiered, getTasks);
router.get("/tasks/:id", authRequiered, getTask);
router.post(
  "/tasks",
  authRequiered,
  validateSchema(createTaskSchema),
  createTasks
);
router.delete("/tasks/:id", authRequiered, deleteTask);
router.put("/tasks/:id", authRequiered, updateTask);

export default router;
