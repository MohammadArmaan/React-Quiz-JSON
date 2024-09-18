/* eslint-disable */
const Question = require('./../model/questionModel');



exports.getAll = async (req, res, next) => {
    try {
      const result = await Question.find();
  
      // Extract questions from the nested structure if needed
      const questions = result[0] ? result[0].questions : result;
  
      // Format the questions to include 'id' as a string
      const formattedQuestions = questions.map(question => ({
        question: question.question,
        options: question.options,
        correctOption: question.correctOption,
        points: question.points,
        id: question._id.toString()  // Ensure 'id' is a string
      }));
  
      res.status(200).json({
        status: 'success',
        results: formattedQuestions.length,
        data: formattedQuestions
      });
    } catch (err) {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
    }
  };
  

exports.getUserTodos = async(req, res, next) => {
    try{
        const questions = await Question.find({ user: req.user._id });
        res.status(200).json({
            status: 'success',
            data: {
                questions
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.createOne = async (req, res, next) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized'
        });
      }
  
      const question = await Question.create({
        question: req.body.question,
        options: req.body.options,
        correctOption: req.body.correctOption,
        points: req.body.points
      });
  
      // Format the response to match the desired format
      const formattedQuestion = {
        question: question.question,
        options: question.options,
        correctOption: question.correctOption,
        points: question.points,
        id: question._id.toString()  // Ensure 'id' is a string
      };
  
      res.status(201).json({
        status: 'success',
        data: formattedQuestion
      });
    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: err.message
      });
    }
  };
  

exports.updateOne = async (req, res, next) => {
    try{
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: question
        });

    }
    catch(err){
        res.status(404).json({
            status: 'error',
            data: err
        })
    }
}

exports.deleteOne = async (req, res, next) => {
    try{
        const question = await Question.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });

    }
    catch(err){
        res.status(404).json({
            status: 'error',
            data: err
        })
    }
}