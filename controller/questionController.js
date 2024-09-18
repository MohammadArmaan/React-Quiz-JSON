/* eslint-disable */
const Question = require('./../model/questionModel');



exports.getAll = async(req, res, next) => {
    try{
        const question = await Question.find();
        res.status(200).json({
            status: 'success',
            results: question.length,
            data: question
        })
    }
    catch(err){
        res.status(404).json({
            status: 'error',
            message: err.message
        })
    }

}

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
    try{
        // const question  = await Question.create(req.body);
        if(!req.user._id) next();
        
        const question = await Question.create({
            question: req.body.question,
            options: req.body.options,
            correctOption: req.body.correctOption,
            points: req.body.points
        });

        res.status(201).json({
            status: 'success',
            data: question
        })
    }
    catch(err){
        res.status(404).json({
            status: 'error',
            data: err

        })
        
    }

}

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