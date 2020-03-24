//here we are going to import every directory from our other modules and run corse.
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/users');

//setting our port.
app.listen(3000);

//parsing everything.
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

//here we are relating our db with our main app module.
require('./db');

//here we are going to use them.
app.use('/', routes);

//here we are using cors.
app.use(cors());

