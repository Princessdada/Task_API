const express = require("express");
const taskControllers = require("../controllers/taskControllers");
const taskRouter = express.Router();

taskRouter.get("/", taskControllers.getAllTasks);
taskRouter.get("/:id", taskControllers.getTasksById);
taskRouter.post("/", taskControllers.addTask);
taskRouter.put("/:id", taskControllers.updateTask);
taskRouter.delete("/:id", taskControllers.deleteTasks);

module.exports = taskRouter;
