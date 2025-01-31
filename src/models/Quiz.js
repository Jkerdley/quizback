const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    isTrueAnswer: { type: Boolean },
});

const questionsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    answers: [answerSchema],
});

module.exports = mongoose.model("Quiz", questionsSchema, "questions");
