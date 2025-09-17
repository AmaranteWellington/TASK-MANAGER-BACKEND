const { Schema, model } = require("mongoose");
const taskSchema = Schema({
    description: {
        type: string,
        require: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const taskModel = model("Task", taskSchema);
module.exports = taskModel;
