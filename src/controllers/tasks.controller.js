import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createTasks = async (req, res) => {
  try {
    const { title, description, date, priority,category } = req.body;
    console.log(req.user);
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
      priority,
      category,
    });

    const savedtask = await newTask.save();

    res.json(savedtask);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Task Not Found" });

    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task Not Found" });
  }
};

export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task Not Found" });
  res.sendStatus(204);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task Not Found" });

  res.json(task);
};

const getTasksSortBy = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ priority: 1 });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json(["Something went wrong"]);
  }
};
