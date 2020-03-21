const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mainController = require('./controllers/main.controller');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/auth.controller');

const server = express();

server.use(helmet());
server.use(bodyParser.json());
server.use(cookieParser());

server.post('/user', mainController.insertUser);

server.get('/user/:_id', authController.validateToken, mainController.getUserById);

server.get('/users', authController.validateToken , mainController.getAllUsers);

server.put('/user', authController.validateToken, mainController.updateUser);

server.delete('/user/:_id', authController.validateToken, mainController.deleteUser);

server.post("/login", authController.login);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})