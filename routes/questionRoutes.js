/* eslint-disable */
const express = require('express');

const questionController = require('./../controller/questionController')

const router = express.Router();

router
    .route('/')
    .get(questionController.getAll)


router
    .route('/:id')
    .patch(questionController.updateOne)
    .delete(questionController.deleteOne);



module.exports = router;