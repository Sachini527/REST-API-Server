// Joi is a validation library for JavaScript objects
const Joi = require('joi');
// load the require function, called that 'express'
const express = require('express');
const app = express();

// adding a middleware function to parse incoming JSON requests
// express.json methos returns a piece of middleware, and then we call app.use to use that middleware in the request processing pipeline
app.use(express.json());

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



// Handling HTTP POST Requests
// In the path we put 'courses' because we are going to post to the collection of courses
// route handler - (req, res) => { ... }
// create a new course object & add it to the course array
app.post('/api/courses', (req, res) => {
    // schema is simply means a structure of the object that we expect to receive
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // console.log(result);



    // Input Validation
    //if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad Request
    //    res.status(400).send('Name is required and should be minimum 3 characters.');
    //    return;
    //}

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    // we send the newly created course object back to the client
    res.send(course);
});



// Handling HTTP PUT Requests

// Look up the course
// If not existing, return 404
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found.');

    // Validate the course name
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    // Update course
    course.name = req.body.name;
    // Return the updated course to the client
    res.send(course);
});


// All the validation logic is moved to a separate function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    // validate the course object against the schema and return the result
    return Joi.validate(course, schema);
}



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



// Handling HTTP DELETE Requests
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course, If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found.');

    // Delete
    // find the index of the course in the courses array and remove it
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //  Return the same course
    res.send(course);
});

// This is a middleware function that parses incoming JSON requests
// assign a port to the node application, the system attempt to read the value of a environmental variable call port, if there is a value we can use that, otherwise we can use a arbitrary number for your developer machine
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


