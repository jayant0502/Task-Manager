const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId for attached with user data
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // provide a timestamp
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
