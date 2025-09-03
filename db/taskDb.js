const mongoose = require("mongoose");

require("dotenv").config();

const CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

function connectToMongoDb() {
  mongoose.connect(CONNECTION_URL);
  mongoose.connection.on("connected", () => {
    console.log("MongoDb connected sucessfully");
  });
  mongoose.connection.on("error", (error) => {
    console.log("An error occured", error);
  });
}

module.exports = { connectToMongoDb };
