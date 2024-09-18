/* eslint-disable */
const express = require('express');
const path = require('path');
const cors = require('cors')
const morgan = require('morgan')

const questionRoutes = require('./routes/questionRoutes');



const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.options('*', cors());

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());



app.use('/', questionRoutes);


app.use((req, res, next) => {
    const status = 404;
    const error = 'Page Not Found';
    res.status(status).render('error', {
        error,
        status
    });
});

module.exports = app;
