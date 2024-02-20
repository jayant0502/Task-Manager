const Task = require("../models/Task");

const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });

    res
      .status(200)
      .send({
        tasks,
        count: tasks.length,
        message: "Task fetched successfully",
      });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const addTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });

    await task.save();

    res.status(200).send({ task, message: "Task saved successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOne({
      _id: taskId,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.status(200).send({ task, message: "Task fetched successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "status"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const task = await Task.findOne({
      _id: taskId,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.status(200).send({ task, message: "Task updated successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOneAndDelete({
      _id: taskId,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.status(200).send({ task, message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getTask,
  addTask,
  getTaskById,
  updateTask,
  deleteTask,
};
