import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { date } from "zod";
dayjs.extend(utc);

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTasks, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);

        setValue("title", task.title);
        setValue("description", task.description);
        setValue("category", task.category);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
      }
    }

    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      category: data.category,
      priority: Number(data.priority),
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    if (!params.id) {
      createTasks(dataValid);
    } else {
      updateTask(params.id, dataValid);
    }
    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl mb-2 font-bold underline">
          {params.id ? "Update Task!" : "Add Task!"}
        </h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="title" className="text-xl my-4">
            Title
          </label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          <label htmlFor="description" className="text-xl my-4">
            Description
          </label>
          <textarea
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            rows="3"
            placeholder="Description"
            {...register("description")}
          />
          <label htmlFor="prio" className="text-xl my-4">
            Priority
          </label>
          <select
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            {...register("priority")}
          >
            <option value="1">High Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">Low Priority</option>
          </select>
          <label htmlFor="title" className="text-xl my-4">
            Category
          </label>
          <select
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            {...register("category")}
          >
            <option value="Undefined">Undefined</option>
            <option value="Work">Work</option>
            <option value="Studies">Studies</option>
            <option value="Leisure">Leisure</option>
            <option value="Exercises">Exercises</option>
            <option value="Meditation">Meditation</option>
          </select>

          <label htmlFor="date" className="text-xl my-4">
            Date
          </label>
          <input
            type="date"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            {...register("date")}
          />
          <button className="bg-zinc-400 rounded-md p-2 text-black mt-2">
            Save Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
