const auth = require('../middleware/auth');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.status(200).send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.status(201).send(genre);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    new: true
  });
  if (!genre)
    return res.status(404).send('The genre with this given id is not found!');

  res.status(200).send(genre);
});

router.delete('/:id', auth, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send('The genre with this given id is not found!');

  res.status(204).send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send('The genre with this given id is not found!');
  res.status(200).send(genre);
});

module.exports = router;
