const mongooseLoader = require('./loaders/mongoose');
const config = require('./config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const home = require('./routes/home');
const genres = require('./routes/genres')
const express = require('express');
const app = express();

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

app.use('/', home);
app.use('/api/genres', genres);

const mongoConnection = mongooseLoader.getConnection();
mongoConnection.then(ans => console.log(ans));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

app.listen(config.port, console.log(`Listening on port ${config.port}...`));

// @TODO: Move validations to proper module
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