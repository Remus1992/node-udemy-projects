const http = require('http');

const express = require('express');

const app = express();

// .use() allows us to add a new middleware function
// it accepts an array of event handlers
// building a function like the one below will be used on 
// every incoming request
app.use((req, res, next) => {
    console.log("In the Middleware!");
    // next() needs to be called for the next function to be called
    next();
});

app.use((req, res, next) => {
    console.log("In another Middleware!");
    // functions like .setHeader() are still valid here
    // but .send() is specific to express
    res.send('<h1>Hello from Express!</h1>');
});
const server = http.createServer(app);

server.listen(3000);

