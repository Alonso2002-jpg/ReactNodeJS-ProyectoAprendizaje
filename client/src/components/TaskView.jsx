import TaskCard from "../components/TaskCard";

export const TaskView = ({ value }) => {
  const sortValue = value.Sort;
  if (sortValue == 3) {
    return (
      <div>
        <p className="font-bold text-3xl py-6">Categories</p>
        <br />
        <h1 className="font-bold text-2xl py-3">Work</h1>
        <hr></hr>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-2 pt-2">
          {value.tasks
            .filter((taks) => taks.category == "Work")
            .map((task) => (
              <TaskCard task={task} key={task._id} />
            ))}
        </div>
        <h1 className="font-bold text-2xl py-3">Studies</h1>
        <hr></hr>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-2 pt-2">
          {value.tasks
            .filter((taks) => taks.category == "Studies")
            .map((task) => (
              <TaskCard task={task} key={task._id} />
            ))}
        </div>
        <h1 className="font-bold text-2xl py-3">Leisure</h1>
        <hr></hr>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-2 pt-2">
          {value.tasks
            .filter((taks) => taks.category == "Leisure")
            .map((task) => (
              <TaskCard task={task} key={task._id} />
            ))}
        </div>
        <h1 className="font-bold text-2xl py-3">Exercises</h1>
        <hr></hr>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-2 pt-2">
          {value.tasks
            .filter((taks) => taks.category == "Exercises")
            .map((task) => (
              <TaskCard task={task} key={task._id} />
            ))}
        </div>
        <h1 className="font-bold text-2xl py-3">Meditation</h1>
        <hr></hr>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-2 pt-2">
          {value.tasks
            .filter((taks) => taks.category == "Meditation")
            .map((task) => (
              <TaskCard task={task} key={task._id} />
            ))}
        </div>
        <h1 className="font-bold text-2xl py-3">Undefined</h1>
        <hr></hr>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-2 pt-2">
          {value.tasks
            .filter((taks) => taks.category == "Undefined")
            .map((task) => (
              <TaskCard task={task} key={task._id} />
            ))}
        </div>
      </div>
    );
  } else if (sortValue == 2) {
    return (
      <div>
        <p className="font-bold text-3xl py-6">Date</p>
        <br />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-2">
          {value.tasks.map((task) => (
            <TaskCard task={task} value={sortValue} key={task._id} />
          ))
          }
        </div>
      </div>
    );
  } else if (sortValue == 1) {
    return (
      <div>
        <p className="font-bold text-3xl py-5">Priority</p>
        <br />
        <div className="flex items-start pb-5">
          <div className="w-10 h-10 bg-red-400 rounded-full"></div>{" "}
          <p className="font-bold m-2">Hard</p>
          <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>{" "}
          <p className="font-bold m-2">Medium</p>
          <div className="w-10 h-10 bg-green-400 rounded-full"></div>{" "}
          <p className="font-bold m-2">Low</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-2">
          {value.tasks.map((task) => (
            <TaskCard task={task} value={sortValue} key={task._id} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-2">
        {value.tasks.map((task) => (
          <TaskCard task={task} value={sortValue} key={task._id} />
        ))}
      </div>
    );
  }
};

export default TaskView;
