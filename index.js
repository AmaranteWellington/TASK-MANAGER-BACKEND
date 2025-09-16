const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const task = [{ description: "Estudar programação", isCompleted: false }];
    res.status(200).send(task);
});
app.listen(8000, () => console.log("Listening on port 8000"));
