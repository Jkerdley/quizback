const chalk = require("chalk");
const Quiz = require("../models/Quiz");

async function addQuestion(title, answers) {
    await Quiz.create({ title, answers });
    console.log(chalk.bgGreen("Заметка добавлена"));
}

async function getQuestions() {
    try {
        const questions = await Quiz.find();
        return questions;
    } catch (error) {
        console.error("Ошибка сервера при получении вопросов:", error);
        return [];
    }
}

async function removeQuestion(id) {
    await Quiz.deleteOne({ _id: id });
    console.log(`Вопрос с id ${id} был удален.`);
}

async function updateQuestions(id, title, answers) {
    await Quiz.updateOne({ _id: id }, { title, answers: answers });
    console.log(`Вопрос с id ${id} был изменен.`);
}

module.exports = {
    addQuestion,
    getQuestions,
    updateQuestions,
    removeQuestion,
};
