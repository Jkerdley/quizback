const express = require("express");
require("dotenv").config();
const cors = require("cors");
const {
    addQuestion,
    getQuestions,
    removeQuestion,
    updateQuestions,
} = require("./src/controllers/quiz.controller"); // Контроллеры для работы с вопросами
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");

const PORT = 3005;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public"))); // Статические файлы
app.use(express.urlencoded({ extended: true })); // Разбор формы
app.use(express.json()); // Разбор JSON-представления тела запроса
app.use(cors()); // Включаем CORS для всех запросов

// GET-запрос для получения вопросов
app.get("/", async (req, res) => {
    const questions = await getQuestions();
    // Возвращаем объект с полем questions
    res.json({ questions });
});

// POST-запрос для добавления нового вопроса
app.post("/", async (req, res) => {
    try {
        // Логирование входящих данных (необходимо для отладки)
        console.log("[Server] Получен запрос на добавление вопроса:", req.body);
        await addQuestion(req.body.title, req.body.answers);
        const questions = await getQuestions();
        console.log("[Server] Текущий список вопросов:", questions);
        // Отправляем весь массив вопросов клиенту
        res.json(questions);
    } catch (err) {
        console.log("Ошибка:", err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE-запрос для удаления вопроса по id
app.delete("/:id", async (req, res) => {
    try {
        await removeQuestion(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.log("Ошибка удаления записи:", error);
    }
});

// PUT-запрос для обновления вопроса по id
app.put("/:id", async (req, res) => {
    try {
        await updateQuestions(req.params.id, req.body.title, req.body.answers);
        res.json({ success: true });
    } catch (error) {
        console.log("Ошибка обновления записи:", error);
    }
});

// Подключаемся к MongoDB через mongoose + добавил сокрытие пароля и логина через .env
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    app.listen(PORT, () => {
        console.log(chalk.blue(`Server has been started on port ${PORT}...`));
    });
});
