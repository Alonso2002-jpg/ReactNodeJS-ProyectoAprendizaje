import { useEffect,useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskView from '../components/TaskView'
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskPage = () => {
  const { getTasks, tasks, sortTasks } = useTasks();
  const [Sort, setSort] = useState()
  useEffect(() => {
    getTasks();
  }, []);



  if (tasks.length === 0)
    return (
      <h1 className="font-bold text-3xl text-center p-10">
        No hay Tareas Disponibles
      </h1>
    );
  return (
    <div>
      <div className="float-right">
        <label htmlFor="sort" className="font-bold">
          Sort By:
        </label>
        <select
          className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md mb-5"
          onChange={(e) => {
            sortTasks(e.target.value)
            setSort(e.target.value)
          }}
        >
          <option value="0">Select Sort</option>
          <option value="1">Priority</option>
          <option value="2">Date</option>
          <option value="3">Category</option>
        </select>
      </div>
      <TaskView value={{Sort,tasks}}></TaskView>
    </div>
  );
};

export default TaskPage;
