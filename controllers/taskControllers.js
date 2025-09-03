const Task = require("../models/task");

let tasks = [
  {
    id: 1,
    title: "Complete Project Proposal",
    description: "Draft and finalize the project proposal for client review.",
    status: "pending",
    createdAt: new Date("2025-08-28T10:00:00Z"),
  },
  {
    id: 2,
    title: "Team Meeting",
    description: "Attend weekly team sync to discuss project progress.",
    status: "completed",
    createdAt: new Date("2025-08-27T14:30:00Z"),
  },
  {
    id: 3,
    title: "Update API Documentation",
    description: "Revise API endpoints and examples in README.",
    status: "pending",
    createdAt: new Date("2025-08-29T09:15:00Z"),
  },
];

async function getAllTasks(req, res) {
  try {
    const { status, sort } = req.query;
    let query = Task.find(); // No await here
    if (status) {
      query = query.where("status").equals(status);
    }
    if (sort === "asc" || sort === "desc") {
      query = query.sort({ createdAt: sort === "asc" ? 1 : -1 });
    }
    const tasks = await query.exec();
    return res.json(tasks);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
}
async function getTasksById(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
}

async function addTask(req, res) {
  try {
    const { title } = req.body;
    const task = req.body;
    if (task == "") {
      res.status(404).send({
        message: "Field is empty",
      });
    }
    const newTask = new Task({
      title,
      description: req.body.description || "",
      status: req.body.status || "pending",
    });
    await newTask.save();
    res.json({
      message: "Tasks sent sucessfully",
      newTask,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Invalid request body", error: err.message });
  }
}

async function updateTask(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }
    const task = req.body;
    await Task.findByIdAndUpdate(id, task, { new: true })
      .then((newtask) => {
        res.status(200).json(newtask);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Invalid request body", error: err.message });
  }
}

async function deleteTasks(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({
        message: "ID Not Found",
      });
    }
    return res.status(204).send();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  getAllTasks,
  getTasksById,
  addTask,
  updateTask,
  deleteTasks,
};
