// load the require function, called that 'express'
const express= require('express');
const app = express();

// This is a middleware function that parses incoming JSON requests
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

// Route Parameters
//app.get('/api/posts/:year/:month', (req, res) => {
//    res.send(req.params);
//});

// query string parameters
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

// This is a middleware function that parses incoming JSON requests
// assign a port to the node application, the system attempt to read the value of a environmental variable call port, if there is a value we can use that, otherwise we can use a arbitrary number for your developer machine
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


