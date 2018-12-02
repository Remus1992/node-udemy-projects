const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes.handler);

server.listen(3000);


// package name is "node-practice"

// 'npm start' will work as-is because start is a built in function
// any other function we build needs "npm run {function name}" 

// 'npm install nodemon' can be used to save/ continue running code
// there are multiple ways to save a package. Two below:
// '--save-dev' : development packages - primarily needed during construction
// '--save' : production dependancies - to be used on the web
// '-g' : will install globally to machine & can be used anywhere 
// then go to package.json and change 'node' to 'nodemon' in "start" : "node app.js"