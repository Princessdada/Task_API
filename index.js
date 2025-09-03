const taskRoute = require("./routes/taskRoute");
require("dotenv").config();

const db = require("./db/taskDb");
// connect to mongoose
db.connectToMongoDb();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Management API");
});

app.use("/tasks", taskRoute);
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).json({
//     error: err.message,
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
