const mongoose = require("mongoose");

// Схема для варианта ответа
const answerSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Текст варианта ответа обязателен
    isTrueAnswer: { type: Boolean }, // Флаг, указывающий, является ли ответ правильным
});

// Схема для вопроса
const questionsSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Текст вопроса обязателен
    answers: [answerSchema], // Массив вариантов ответов
});

// Экспорт модели Quiz, использующей схему вопросов, коллекция – "questions"
module.exports = mongoose.model("Quiz", questionsSchema, "questions");
