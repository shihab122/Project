const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genres = [
  { id: 1, name: 'Genres 1' },
  { id: 2, name: 'Genres 2' },
  { id: 3, name: 'Genres 3' }
];

router.get('/', (req, res) => {
  res.status(200).send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with this given id is not found!');
  res.status(200).send(genre);
});

router.post('/create', (req, res) => {
  const { error } = inputValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.status(201).send(genre);
});

router.put('/update/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with this given id is not found!');
  const { error } = inputValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const index = genres.indexOf(genre);
  genres[index].name = req.body.name;
  res.status(200).send(genres[index]);
});

router.delete('/delete/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with this given id is not found!');
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.status(204).send('Successfully deleted');
});

function inputValidator(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(20)
      .required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
