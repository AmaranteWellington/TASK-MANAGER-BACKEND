const taskModel = require("../models/task.models");
const { notFoundError } = require("../errors/mongodb.errors");
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async getAll() {
        try {
            const task = await taskModel.find({});
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    async getById() {
        try {
            const taskId = this.req.params.id;
            const task = await taskModel.findById(taskId);
            if (!task) {
                return notFoundError(this.res);
            }
            return this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    async create() {
        try {
            const newTask = new taskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.messager);
        }
    }
    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;
            const taskToUpdate = await taskModel.findById(taskId);
            if (!taskToUpdate) {
                return notFoundError(this.res);
            }
            const allowedUpdates = ["isCompleted"];
            const requestedUpdates = Object.keys(this.req.body);
            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res
                        .status(500)
                        .send("Um ou mais campos inseridos não são editáveis!");
                }
                await taskToUpdate.save();
                return this.res.status(200).send(taskToUpdate);
            }
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
    async delete() {
        try {
            const taskId = this.req.params.id;
            const deleteTask = await taskModel.findByIdAndDelete(taskId);
            if (!deleteTask) {
                return notFoundError(this.res);
            }

            this.res.status(200).send(deleteTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}
module.exports = TaskController;
