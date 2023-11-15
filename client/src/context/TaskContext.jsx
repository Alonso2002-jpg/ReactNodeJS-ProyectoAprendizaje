import { createContext, useContext, useState } from "react";
import {
  createTasksRequest,
  deleteTasksRequest,
  getTaskRequest,
  getTasksRequest,
  updateTasksRequest,
} from "../api/tasks";

export const TaskContext = createContext();

const compareDate = (task1, task2) => {
  const fec1 = new Date(task1.date);
  const fec2 = new Date(task2.date);
  if (fec1 > fec2) return 1;
  else if (fec1 > fec2) return -1;
  return -1;
};

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTasks = async (task) => {
    const res = await createTasksRequest(task);
    if (res.error) return console.log(res.error);
    console.log(res);
  };

  const deleteTasks = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTasksRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  };

  const sortTasks = (value) => {
    let sortedTasks = [...tasks];
    if (value == 1) {
      sortedTasks = tasks.sort(
        (task1, task2) => task1.priority - task2.priority
      );
      console.log("Priority");
    } else if (value == 2) {
      sortedTasks = tasks.sort(compareDate);
      console.log("Date");
    } else if (value == 3) {
      sortedTasks = tasks.sort((t1, t2) => {
        t1.title > t2.title;
      });
    }else{
      
    }
    setTasks([...sortedTasks]);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTasks,
        getTasks,
        deleteTasks,
        getTask,
        updateTask,
        sortTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
