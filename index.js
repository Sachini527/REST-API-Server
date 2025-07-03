// load the require function, called that 'express'
const express = require('express');
const app = express();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];
// This is a middleware function that parses incoming JSON requests
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Route Parameters
//app.get('/api/posts/:year/:month', (req, res) => {
//    res.send(req.params);
//});

// query string parameters
//app.get('/api/posts/:year/:month', (req, res) => {
//    res.send(req.query);
//});

// Handling HTTP GET Requests
// to get a specific course by its ID
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

// This is a middleware function that parses incoming JSON requests
// assign a port to the node application, the system attempt to read the value of a environmental variable call port, if there is a value we can use that, otherwise we can use a arbitrary number for your developer machine
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


