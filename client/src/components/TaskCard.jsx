import dayjs from "dayjs";
import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const TaskCard = ({ task }, { value }) => {
  const { deleteTasks } = useTasks();
  const [endTask, setEndTask] = useState(false);

  function linePrio(prio) {
    if (task.priority === 1)
      return (
        <div className="bg-red-400 max-w-md w-full h-4 rounded-md mb-4"></div>
      );
    else if (task.priority === 2)
      return (
        <div className="bg-yellow-400 max-w-md w-full h-4 rounded-md mb-4"></div>
      );
    else if (task.priority === 3)
      return (
        <div className="bg-green-400 max-w-md w-full h-4 rounded-md mb-4"></div>
      );
  }
  return (
    <div className="bg-zinc-500 max-w-md w-full p-8 rounded-md">
      {linePrio(task.priority)}
      <header className="flex justify-between">
        <h1 className={`text-xl font-bold ${endTask ? "line-through " : ""}`}>
          {task.title}
        </h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => deleteTasks(task._id)}
            className="bg-red-500 hover:bg-red-700 rounded-md p-2"
          >
            Delete
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="bg-indigo-600 hover:bg-indigo-700 rounded-md px-5 py-2"
          >
            Edit
          </Link>
        </div>
      </header>
      <p className={`text-slate-300 ${endTask ? "line-through" : ""}`}>
        {task.description}
      </p>
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
      <div className="flex justify-between gap-x-3 mt-5">
        <button
          onClick={() => {
            setEndTask(true);
          }}
          className="bg-purple-600 hover:bg-purple-800 rounded-md px-5 py-2 w-full"
        >
          End Task
        </button>
        <button
          onClick={() => {
            setEndTask(false);
          }}
          className="bg-fuchsia-600 hover:bg-fuchsia-800 rounded-md px-10 p-2 w-full"
        >
          Restart Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
