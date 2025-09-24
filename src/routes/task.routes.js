const express = require("express");

const TaskController = require("../controllers/task.controllers");
const taskModel = require("../models/task.models");

const router = express.Router();
router.get("/", async (req, res) => {
    return new TaskController(req, res).get();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).post();
});
router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).patch();
});
router.delete("/:id", async (req, res) => {
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

module.exports = router;
