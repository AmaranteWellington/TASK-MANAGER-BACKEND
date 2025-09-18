const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database.js");
const taskModel = require("./src/models/task.models.js");

dotenv.config();
const app = express();
app.use(express.json());
connectToDatabase();

app.get("/task", async (req, res) => {
    try {
        const task = await taskModel.find({});
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/task", async (req, res) => {
    try {
        const newTask = new taskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.messager);
    }
});
app.delete("/task/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const deleteTask = await taskModel.findByIdAndDelete(taskId);
        if (!deleteTask) {
            return res.status(404).send("Task não encontrada ou já deletada!");
        }

        res.status(200).send(deleteTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(8000, () => console.log("Listening on port 8000"));
