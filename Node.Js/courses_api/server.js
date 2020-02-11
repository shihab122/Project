const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: "Wev Development"},
    {id: 2, name: "Mobile App Development"}
]

app.get('/api/v1/courses', (req, res) => {
    res.status(200).send(courses);
});

app.get('/api/v1/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id is not found!");
    res.status(200).send(course);
});

app.post('/api/v1/courses/create', (req, res) => {
    const {error} = inputValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.status(201).send(course);

});

app.put('/api/v1/courses/update/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id is not found!");
    const {error} = inputValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const index = courses.indexOf(course);
    courses[index].name = req.body.name;
    return res.status(200).send(courses[index]);
});

app.delete('/api/v1/courses/delete/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id is not found!");
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.status(204).send("Successfully deleted");
});

function inputValidate(course){
    const schema = {
        name: Joi.string().min(8).max(20).required()
    }
    const result = Joi.validate(course, schema);
    return result;
}

const PORT = process.env.port || 3000
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));