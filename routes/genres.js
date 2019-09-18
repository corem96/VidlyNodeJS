const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'drama' },
    { id: 2, name: 'horror' },
    { id: 3, name: 'action' },
];

router.get('/', (req, res) => {
    if (genres.length < 1) return status(404).send('There are no genres found');
    res.send(genres);
});

router.get('/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');
    res.send(genre);
});

router.post('', (req,res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    res.send(req.body);
    const genre = createGenre(req.body);
});

router.put(':id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');

    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error[0].details.message);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/api/genres/:d', (req,res) => {
    const genre = genres.find(g => g.id === req.body.id);
    if (!genre) return res.status(404).send('Genre not found');

    genres = genres.filter(g => g.id !== genre.id);
    res.send(genre);
});

module.exports = router;