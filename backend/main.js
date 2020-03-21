const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mainController = require('./controllers/main.controller');

const server = express();

server.use(helmet());
server.use(bodyParser.json())

server.post('/user', mainController.insertUser);

server.get('/user/:_id', mainController.getUserById);

server.get('/users', mainController.getAllUsers);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})