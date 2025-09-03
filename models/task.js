const mongoose = require("mongoose");

// define a schema

const Schema = mongoose.Schema;

// Define tasks schema

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is Required"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title must not exceed 100 characters"],
  },
  description: {
    type: String,
    maxlength: [500, "Description must not exceed 500 characters"],
  },
  status: {
    type: String,
    default: "pending",
    enum: {
      values: ["pending", "in-progress", "completed"],
      message: "{VALUE} is not a valid status.",
    },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
