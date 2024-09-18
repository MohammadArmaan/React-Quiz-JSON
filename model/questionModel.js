const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questions: [
    {
      question: {
        type: String,
        required: [true, 'A question is required'],
      },
      options: {
        type: [String],
        required: [true, 'Options are required'],
      },
      correctOption: {
        type: Number,
        required: [true, 'Correct option is required'],
      },
      points: {
        type: Number,
        required: [true, 'Points are required'],
      },
    },
  ],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
