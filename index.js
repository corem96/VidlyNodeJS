const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const home = require('./routes/home');
const genres = require('./routes/genres')
const express = require('express');
const app = express();

console.log(`Application name: ${config.get('name')}`);

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

app.use('/', home);
app.use('/api/genres', genres);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

const port = process.env.PORT || 3300;
app.listen(port, console.log(`Listening on port ${port}...`));

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

function createGenre(params) {
    return {
        id: genres.length + 1,
        name: params.name
    };
}