const express = require("express");
const cors = require("cors");
const {
    addQuestion,
    getQuestions,
    removeQuestion,
    updateQuestions,
} = require("./src/controllers/quiz.controller");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");

const PORT = 3005;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    const questions = await getQuestions();
    res.json({ questions });
});

app.post("/", async (req, res) => {
    try {
        await addQuestion(req.body.title, req.body.answers);
        const questions = await getQuestions();
        res.json(questions);
    } catch (err) {
        console.log("Ошибка:", err);
    }
});

app.delete("/:id", async (req, res) => {
    try {
        await removeQuestion(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.log("Ошибка удаления записи:", error);
    }
});

app.put("/:id", async (req, res) => {
    try {
        await updateQuestions(req.params.id, req.body.title, req.body.answers);
        res.json({ success: true });
    } catch (error) {
        console.log("Ошибка обновления записи:", error);
    }
});

mongoose
    .connect(
        "mongodb+srv://jkerdley:3666131992iqaq@nodecluster.n0j5a.mongodb.net/quiz?retryWrites=true&w=majority&appName=NODECluster"
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(chalk.blue(`Server has been started on port ${PORT}...`));
        });
    });
