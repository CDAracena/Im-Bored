const express = require('express');
const logger = require('morgan');

const bodyParser = require('body-parser');

const http = require('http');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => res.status(200).sendfile('index.html'))

const port = parseInt(process.env.PORT, 10) || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

module.exports = app;
