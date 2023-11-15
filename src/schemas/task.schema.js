import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({ required_error: "Title is requiered" }),
  description: z
    .string({ required_error: "Description is required" }),
  date: z.string().datetime().optional(),
  priority: z.number().optional(),
  category: z.string().optional(),
});
