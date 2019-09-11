const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const app = express();

const genres = [
    { id: 1, name: 'drama' },
    { id: 2, name: 'horror' },
    { id: 3, name: 'action' },
];

app.use(express.json());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

app.get('/api/genres', (req, res) => {
    if (genres.length < 1) return status(404).send('There are no genres found');
    res.send(genres);
});

app.get('/api/genres/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');
    res.send(genre);
});

app.post('/api/genres/', (req,res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    res.send(req.body);
    const genre = createGenre(req.body);
});

app.put('/api/genres/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');

    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error[0].details.message);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:d', (req,res) => {
    const genre = genres.find(g => g.id === req.body.id);
    if (!genre) return res.status(404).send('Genre not found');

    genres = genres.filter(g => g.id !== genre.id);
    res.send(genre);
});

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