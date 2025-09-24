const taskModel = require("../models/task.models");
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async get() {
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
                return this.res
                    .status(404)
                    .send("Task não encontrada ou já deletada!");
            }
            return this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}
module.exports = TaskController;
