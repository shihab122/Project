const Joi = require('joi');
const express = require('express');
const router = express.Router();

const courses = [
  { id: 1, name: 'Wev Development' },
  { id: 2, name: 'Mobile App Development' }
];

router.get('/', (req, res) => {
  res.status(200).send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given id is not found!');
  res.status(200).send(course);
});

router.post('/create', (req, res) => {
  const { error } = inputValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.status(201).send(course);
});

router.put('/update/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with this given id is not found!');
  const { error } = inputValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const index = courses.indexOf(course);
  courses[index].name = req.body.name;
  return res.status(200).send(courses[index]);
});

router.delete('/delete/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with this given id is not found!');
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.status(204).send('Successfully deleted');
});

function inputValidate(course) {
  const schema = {
    name: Joi.string()
      .min(8)
      .max(20)
      .required()
  };
  const result = Joi.validate(course, schema);
  return result;
}

module.exports = router;
