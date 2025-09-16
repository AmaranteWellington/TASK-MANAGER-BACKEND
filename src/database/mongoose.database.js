const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagercluster.o7pr8lf.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagerCluster`
    );
};
module.exports = connectToDatabase;
