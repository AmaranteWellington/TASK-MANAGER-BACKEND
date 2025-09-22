const express = require("express");
const dotenv = require("dotenv");
const taskRouter = require("./src/routes/task.routes.js");

const connectToDatabase = require("./src/database/mongoose.database.js");

dotenv.config();

const app = express();
app.use(express.json());

connectToDatabase();

app.use("/task", taskRouter);

app.listen(8000, () => console.log("Listening on port 8000"));
