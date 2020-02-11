const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: "Genres 1"},
    {id: 2, name: "Genres 2"},
    {id: 3, name: "Genres 3"}
]

app.get('/api/v1/genres', (req, res) => {
    res.status(200).send(genres);
});

app.get('/api/v1/genres/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with this given id is not found!');
    res.status(200).send(genre);
});

app.post('/api/v1/genres/create', (req, res) => {
    const {error} = inputValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.status(201).send(genre);
});

app.put('/api/v1/genres/update/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with this given id is not found!');
    const {error} = inputValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const index = genres.indexOf(genre);
    genres[index].name = req.body.name;
    res.status(200).send(genres[index]);
});

app.delete('/api/v1/genres/delete/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with this given id is not found!');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.status(204).send('Successfully deleted');
});


function inputValidator(genre){
    const schema = {
        name: Joi.string().min(3).max(20).required()
    }
    return Joi.validate(genre, schema);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App listening on port 3000!'));